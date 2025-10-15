'use server';

export const verifyTurnstileToken = async (token: string) => {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) throw new Error('SECRET KEY IS NULL');

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      secret,
      response: token,
    }),
  });

  const result = await res.json();
  return result.success;
};
