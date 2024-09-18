import { IncomingMessage, ServerResponse } from 'http';
import {prisma} from '../../prisma/client/prismaClient';
import { validateUser } from '../../schema/validator';
type PropsPutUsers = {
    req: IncomingMessage,
    res: ServerResponse,
    url: URL
}
export async function putUsers({ req, res, url }: PropsPutUsers){
    const putId = url.searchParams.get('id');
    if (!putId) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'ID is required' }));
      return;
    }
    let putbody = '';
    req.on('data', chunk => {
      putbody += chunk.toString();
    });
    req.on('end', async () => {
      try {
        const parsedBody = JSON.parse(putbody);
        const { data, error } = validateUser(parsedBody);
        const user = await prisma.user.update({
          where: { id: putId },
          data: {
            email: data?.email,
            name: data?.name
          }
        });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error updating user' }));
      }
    });
}