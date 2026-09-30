import { afterEach, describe, expect, it, vi } from 'vitest';
import { onRequestPost } from './contact';

const submission = {
  name: 'A Visitor',
  email: 'visitor@example.com',
  subject: 'Project inquiry',
  message: 'I would like to discuss a project.',
  company: '',
};

function request(body: unknown): Request {
  return new Request('https://example.com/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('contact API', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('confirms delivery only after the sheet endpoint confirms it', async () => {
    const upstream = vi.fn().mockResolvedValue(new Response('{"result":"success"}', { status: 200 }));
    vi.stubGlobal('fetch', upstream);

    const response = await onRequestPost({
      request: request(submission),
      env: { CONTACT_ENDPOINT: 'https://script.google.com/test' },
    });

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ result: 'success' });
    expect(upstream).toHaveBeenCalledOnce();
  });

  it('reports failure when the sheet endpoint does not confirm delivery', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{"result":"error"}', { status: 200 })));
    const response = await onRequestPost({
      request: request(submission),
      env: { CONTACT_ENDPOINT: 'https://script.google.com/test' },
    });
    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({ result: 'error' });
  });

  it('rejects invalid submissions before forwarding them', async () => {
    const upstream = vi.fn();
    vi.stubGlobal('fetch', upstream);
    const response = await onRequestPost({
      request: request({ ...submission, email: 'invalid' }),
      env: { CONTACT_ENDPOINT: 'https://script.google.com/test' },
    });
    expect(response.status).toBe(400);
    expect(upstream).not.toHaveBeenCalled();
  });
});
