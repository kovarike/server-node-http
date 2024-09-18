import { IncomingMessage, ServerResponse } from 'http';
import {prisma} from '../../prisma/client/prismaClient';
type PropsGetUsers = {
    req: IncomingMessage,
    res: ServerResponse
}
export async function getUsers({ req, res }: PropsGetUsers){
    try {
        const user  = await prisma.user.findMany();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error fetching user' }));
    }
}