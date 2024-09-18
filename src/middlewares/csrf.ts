import { IncomingMessage, ServerResponse } from 'http';
import crypto from 'crypto';

// Gerar um token CSRF
export const generateCsrfToken = () => crypto.randomBytes(64).toString('hex');

// Configurar o cookie do token CSRF
export const setCsrfTokenCookie = (res: ServerResponse, token: string) => {
  res.setHeader('Set-Cookie', `csrfToken=${token}; HttpOnly; Secure; SameSite=Strict`);
};

// Middleware para verificar o token CSRF
export const csrfMiddleware = (req: IncomingMessage, res: ServerResponse, next: () => void) => {
  const csrfToken = req.headers['x-csrf-token'];
  const cookies = req.headers.cookie || '';

  const csrfCookie = cookies.split('; ').find(cookie => cookie.startsWith('csrfToken='));
  const storedCsrfToken = csrfCookie ? csrfCookie.split('=')[1] : '';

  if (csrfToken && csrfToken === storedCsrfToken) {
    next();
  } else {
    res.writeHead(403, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Forbidden' }));
  }
};
