import { IncomingMessage, ServerResponse } from 'http';
import {prisma} from '../../prisma/client/prismaClient';
import { v4 as uuid } from 'uuid';
import { validateUser } from '../../schema/validator';
type PropsPostUsers = {
    req: IncomingMessage,
    res: ServerResponse
}
export async function postUsers({ req, res }: PropsPostUsers){
    let body = '';

        req.on('data', chunk => {
          body += chunk.toString();
        });

        req.on('end', async () => {

          try {
            const parsedBody = JSON.parse(body);
            const { data, error } = validateUser(parsedBody);

            if (!data) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ errors: error }));
              return;
            };

            const user = await prisma.user.create({
              data: {
                id: uuid(),
                email:data.email,
                name:data.name,
              }
            });
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
            
          } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error creating user' }));
          }
        });
}