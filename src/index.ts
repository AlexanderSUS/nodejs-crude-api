import { createServer } from 'http';
import { MESSAGE_ERROR_400, MESSAGE_ERROR_404 } from './const/messages';
import { CODE_400, CODE_404 } from './const/statusCodes';
import { USERS_URL } from './const/urls';
import {
  getUsers, getUser, createUser, updateUser,
} from './controllers/userController';
import ID_PARAM_ORDER from './const/id';

const server = createServer((req, res) => {
  if (req.url === USERS_URL && req.method === 'GET') {
    getUsers(req, res);
  } else if (req.url?.startsWith(`${USERS_URL}/`) && req.method === 'GET') {
    const id: string = req.url.split('/')[ID_PARAM_ORDER];

    if (id && typeof id === 'string') {
      getUser(req, res, id);
    } else {
      res.writeHead(CODE_400, { 'Content-type': 'application/json' });
      res.end(JSON.stringify({ message: MESSAGE_ERROR_400 }));
    }
  } else if (req.url === USERS_URL && req.method === 'POST') {
    createUser(req, res);
  } else if (req.url?.startsWith(`${USERS_URL}/`) && req.method === 'PUT') {
    const userId: string = req.url.split('/')[ID_PARAM_ORDER];
    if (userId && typeof userId === 'string') {
      updateUser(req, res, userId);
    } else {
      res.writeHead(CODE_400, { 'Content-type': 'application/json' });
      res.end(JSON.stringify({ message: MESSAGE_ERROR_400 }));
    }
  } else {
    res.writeHead(CODE_404, { 'Content-type': 'application/json' });
    res.end(JSON.stringify({ message: MESSAGE_ERROR_404 }));
  }
});

// TODO add .env file
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log('Server running on port 5000'));
