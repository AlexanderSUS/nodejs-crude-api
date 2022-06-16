import { IncomingMessage, ServerResponse } from 'http';
import { MESSAGE_ERROR_404 } from '../const/messages';
import { CODE_200, CODE_404 } from '../const/statusCodes';
import * as Users from '../models/userModel';

// @desc get all users
// @route GET /api/users
export async function getUsers(req: IncomingMessage, res: ServerResponse) {
  try {
    const users = await Users.findAllUsers();

    res.writeHead(CODE_200, { 'Content-type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (err) {
    console.log(err);
  }
}

// @desc get single user
// @route GET /api/user/:id
export async function getUser(req: IncomingMessage, res: ServerResponse, id: string) {
  try {
    const user = await Users.findById(id);

    if (user) {
      res.writeHead(CODE_200, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(CODE_404, { 'Content-type': 'application/json' });
      res.end(JSON.stringify({ message: MESSAGE_ERROR_404 }));
    }
  } catch (err) {
    console.log(err);
  }
}
