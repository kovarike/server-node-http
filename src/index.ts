import http, { IncomingMessage, ServerResponse } from 'http';
import { corsMiddleware } from './middlewares/cors';
import { authMiddleware } from './middlewares/auth';
import {usersRoutes} from './router/users-router';

const PORT = 3000;

const errorHandler = (req: IncomingMessage, res: ServerResponse, err: Error) => {
  console.error(err);
  res.writeHead(500, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Internal Server Error' }));
};

const requestHandler = (req: IncomingMessage, res: ServerResponse) => {
  try {
    corsMiddleware(req, res);
    authMiddleware(req, res, () => usersRoutes(req, res));
  } catch (err) {
    errorHandler(req, res, err as Error);
  }
};


const server = http.createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// import http, { IncomingMessage, ServerResponse } from 'http';
// import { corsMiddleware } from './middlewares/cors';
// import { authMiddleware } from './middlewares/auth';
// import { csrfMiddleware, generateCsrfToken, setCsrfTokenCookie } from './middlewares/csrf';
// import { usersRoutes } from './router/users-router';

// const PORT = 3000;

// const errorHandler = (req: IncomingMessage, res: ServerResponse, err: Error) => {
//   console.error(err);
//   res.writeHead(500, { 'Content-Type': 'application/json' });
//   res.end(JSON.stringify({ message: 'Internal Server Error' }));
// };

// const requestHandler = (req: IncomingMessage, res: ServerResponse) => {
//   try {
//     corsMiddleware(req, res);
    
//     // Configurar o token CSRF para rotas protegidas
//     const csrfToken = generateCsrfToken();
//     setCsrfTokenCookie(res, csrfToken);

//     // Aplicar o middleware CSRF e de autenticação
//     csrfMiddleware(req, res, () => {
//       authMiddleware(req, res, () => usersRoutes(req, res));
//     });
//   } catch (err) {
//     errorHandler(req, res, err as Error);
//   }
// };

// const server = http.createServer(requestHandler);

// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
