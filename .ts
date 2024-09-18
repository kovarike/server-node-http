import crypto from 'crypto';
import { IncomingMessage, ServerResponse } from 'http';

const generateCsrfToken = () => crypto.randomBytes(64).toString('hex');

export const setCsrfTokenCookie = (res: ServerResponse, token: string) => {
  res.setHeader('Set-Cookie', `csrfToken=${token}; HttpOnly; Secure; SameSite=Strict`);
};

export const csrfMiddleware = (req: IncomingMessage, res: ServerResponse, next: () => void) => {
  const csrfToken = req.headers['x-csrf-token'];
  if (csrfToken) {
    // Verifique o token CSRF com o valor armazenado no cookie ou na sessão
    if (csrfToken === req.cookies.csrfToken) {
      next();
    } else {
      res.writeHead(403, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Forbidden' }));
    }
  } else {
    res.writeHead(403, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'CSRF token missing' }));
  }
};

//No frontend, você deve incluir o token CSRF em todas as requisições POST, PUT, DELETE, etc.
// Adiciona o token CSRF ao cabeçalho da requisição
const csrfToken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrfToken=')).split('=')[1];

fetch('/api/some-endpoint', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrfToken
  },
  body: JSON.stringify({ someData: 'value' })
});
