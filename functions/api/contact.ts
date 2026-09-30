/** Cloudflare Pages Function: POST /api/contact */
interface Env {
  CONTACT_ENDPOINT?: string;
  NEXT_PUBLIC_CONTACT_ENDPOINT?: string;
}

interface RequestContext {
  request: Request;
  env: Env;
}

type Submission = Record<'name' | 'email' | 'subject' | 'message' | 'company', string>;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

function valid(value: unknown, min: number, max: number): value is string {
  return typeof value === 'string' && value.trim().length >= min && value.trim().length <= max;
}

export const onRequestPost = async ({ request, env }: RequestContext): Promise<Response> => {
  const endpoint = env.CONTACT_ENDPOINT || env.NEXT_PUBLIC_CONTACT_ENDPOINT;
  if (!endpoint) return json({ result: 'error' }, 503);

  let input: Record<string, unknown>;
  try {
    const payload: unknown = await request.json();
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      return json({ result: 'error' }, 400);
    }
    input = payload as Record<string, unknown>;
  } catch {
    return json({ result: 'error' }, 400);
  }

  if (
    !valid(input.name, 2, 100) ||
    !valid(input.email, 3, 254) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email) ||
    !valid(input.subject, 3, 200) ||
    !valid(input.message, 10, 5000)
  ) {
    return json({ result: 'error' }, 400);
  }

  // The hidden field is a low-cost spam filter; reject direct bot submissions too.
  if (typeof input.company === 'string' && input.company.trim()) {
    return json({ result: 'success' });
  }

  const submission: Submission = {
    name: input.name.trim(),
    email: input.email.trim(),
    subject: input.subject.trim(),
    message: input.message.trim(),
    company: '',
  };

  try {
    const upstream = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(submission),
    });
    if (!upstream.ok) return json({ result: 'error' }, 502);

    const result = (await upstream.json()) as { result?: string };
    if (result.result !== 'success') return json({ result: 'error' }, 502);
    return json({ result: 'success' });
  } catch {
    return json({ result: 'error' }, 502);
  }
};
