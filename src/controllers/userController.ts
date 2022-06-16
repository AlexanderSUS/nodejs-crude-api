import { IncomingMessage, ServerResponse } from 'http';
import { CODE_200 } from '../const/statusCodes';
import findAllUsers from '../models/userModel';

async function getUsers(req: IncomingMessage, res: ServerResponse) {
  try {
    const users = await findAllUsers();

    res.writeHead(CODE_200, { 'Content-type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (err) {
    console.log(err);
  }
}

export default getUsers;
