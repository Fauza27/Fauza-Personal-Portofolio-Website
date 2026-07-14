/**
 * Cloudflare Pages Function: POST /api/chat
 * =============================================================================
 * Secure server-side proxy to the OpenAI API for the "Ask Fauza's AI" widget.
 * The OpenAI key NEVER touches the browser - it lives only in this function's
 * environment as a secret.
 *
 * Required environment variable (set in Cloudflare Pages > Settings >
 * Environment variables, or in .dev.vars for local `wrangler pages dev`):
 *   - OPENAI_API_KEY   (secret)   your OpenAI API key
 * Optional:
 *   - OPENAI_MODEL                defaults to "gpt-4o-mini"
 *
 * Request body (JSON):
 *   { "message": string, "history"?: { role: "user"|"assistant", content: string }[] }
 * Response (JSON):
 *   { "reply": string }   on success
 *   { "error": string }   on failure
 * =============================================================================
 */

import { buildSystemPrompt } from './_persona';

interface Env {
  OPENAI_API_KEY?: string;
  OPENAI_MODEL?: string;
}

interface RequestContext {
  request: Request;
  env: Env;
}

type Role = 'system' | 'user' | 'assistant';
interface ChatMessage {
  role: Role;
  content: string;
}

const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY = 12;
const DEFAULT_MODEL = 'gpt-4o-mini';

const ALLOWED_ORIGINS = [
  'https://fauza.pages.dev',
  'http://localhost:3000',
];

function getCorsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get('Origin') || '';
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function json(request: Request, body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...getCorsHeaders(request) },
  });
}

export const onRequestOptions = (context: RequestContext): Response =>
  new Response(null, { status: 204, headers: getCorsHeaders(context.request) });

export const onRequestPost = async (context: RequestContext): Promise<Response> => {
  const { request, env } = context;

  if (!env.OPENAI_API_KEY) {
    return json(
      request,
      { error: 'Chat is not configured yet. Missing OPENAI_API_KEY on the server.' },
      503
    );
  }

  let payload: { message?: unknown; history?: unknown };
  try {
    payload = await request.json();
  } catch {
    return json(request, { error: 'Invalid JSON body.' }, 400);
  }

  const message = typeof payload.message === 'string' ? payload.message.trim() : '';
  if (!message) {
    return json(request, { error: 'Message is required.' }, 400);
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return json(request, { error: 'Message is too long.' }, 413);
  }

  // Sanitize history: keep only user/assistant turns with string content.
  const rawHistory = Array.isArray(payload.history) ? payload.history : [];
  const history: ChatMessage[] = rawHistory
    .filter(
      (m): m is ChatMessage =>
        !!m &&
        typeof (m as ChatMessage).content === 'string' &&
        ((m as ChatMessage).role === 'user' || (m as ChatMessage).role === 'assistant')
    )
    .slice(-MAX_HISTORY)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LENGTH) }));

  const messages: ChatMessage[] = [
    { role: 'system', content: buildSystemPrompt() },
    ...history,
    { role: 'user', content: message },
  ];

  const model = env.OPENAI_MODEL || DEFAULT_MODEL;

  let openaiResp: Response;
  try {
    openaiResp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.4,
        max_tokens: 600,
      }),
    });
  } catch {
    return json(request, { error: 'Could not reach the AI service. Please try again.' }, 502);
  }

  if (!openaiResp.ok) {
    // Avoid leaking provider internals to the client.
    return json(request, { error: 'The AI service returned an error. Please try again later.' }, 502);
  }

  const data = (await openaiResp.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const reply = data.choices?.[0]?.message?.content?.trim();

  if (!reply) {
    return json(request, { error: 'Empty response from the AI service.' }, 502);
  }

  return json(request, { reply });
};
