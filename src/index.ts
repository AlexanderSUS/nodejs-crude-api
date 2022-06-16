import { createServer } from 'http';
import { MESSAGE_ERROR_404 } from './const/messages';
import { CODE_404 } from './const/statusCodes';
import { USERS_URL } from './const/urls';
import getUsers from './controllers/userController';

const server = createServer((req, res) => {
  if (req.url === USERS_URL && req.method === 'GET') {
    getUsers(req, res);
  } else {
    res.writeHead(CODE_404, { 'Content-type': 'application/json' });
    res.end(JSON.stringify(MESSAGE_ERROR_404));
  }
});

// TODO add .env file
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log('Server running on port 5000'));
