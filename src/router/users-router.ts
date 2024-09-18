
import { IncomingMessage, ServerResponse } from 'http';
import { getUsers } from './functions/get-users';
import { postUsers } from './functions/post_users';
import { putUsers } from './functions/put-users';
import { deleteUsers } from './functions/delete-users';

export const usersRoutes = async (req: IncomingMessage, res: ServerResponse) => {
  const url = new URL(req.url || '', `http://${req.headers.host}`);
  const pathname = url.pathname;

  if (pathname === '/api/users') {
    switch (req.method) {
      case 'GET':
        getUsers({req, res});
        break;

      case 'POST':
        postUsers({req, res});
        break;

      case 'PUT':
        putUsers({req, res, url});
        break;

      case 'DELETE':
        deleteUsers({req, res, url});
        break;

      default:
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Method Not Allowed' }));
        break;
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
};


