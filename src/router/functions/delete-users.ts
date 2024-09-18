import { IncomingMessage, ServerResponse } from 'http';
import {prisma} from '../../prisma/client/prismaClient';
type PropsDeleteUsers = {
    req: IncomingMessage,
    res: ServerResponse,
    url: URL
}
export async function deleteUsers({ req, res, url }: PropsDeleteUsers){
    const deleteId = url.searchParams.get('id');
    if (!deleteId) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'ID is required' }));
      return;
    }
    try {
      await prisma.user.delete({
        where: { id: deleteId }
      })
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Delete user' }));
      
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Delete user' }));
    }
  
}