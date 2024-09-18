import { IncomingMessage, ServerResponse } from 'http';

export const authMiddleware = (req: IncomingMessage, res: ServerResponse, next: () => void) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader === 'Bearer your-token') {
    next();
  } else {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Unauthorized' }));
  }
};

// import { IncomingMessage, ServerResponse } from 'http';
// import jwt from 'jsonwebtoken';

// const secretKey = process.env.JWT_SECRET_KEY || 'default-secret';

// // Definindo a interface para o payload do JWT
// interface JwtPayload {
//   id: string;
//   roles: string[];
// }

// export const authMiddleware = (req: IncomingMessage, res: ServerResponse, next: () => void) => {
//   const authHeader = req.headers.authorization;

//   if (authHeader && authHeader.startsWith('Bearer ')) {
//     const token = authHeader.split(' ')[1];

//     try {
//       // Verificar e decodificar o token JWT
//       const decoded = jwt.verify(token, secretKey) as JwtPayload;

//       // Adiciona o payload decodificado à requisição
//       (req as any).user = decoded;

//       // Chama o próximo middleware ou a rota
//       next();
//     } catch (err) {
//       res.writeHead(401, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify({ message: 'Unauthorized' }));
//     }
//   } else {
//     res.writeHead(401, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify({ message: 'Unauthorized' }));
//   }
// };
