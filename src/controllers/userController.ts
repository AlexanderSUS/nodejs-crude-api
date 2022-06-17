import { IncomingMessage, ServerResponse } from 'http';
import * as Users from '../models/userModel';
import getPostData from '../utils/getPostData';
import {
  replyDeleted, replyInternalServerError, replyNotFoundOrInternalServerError, replyOkWithData,
} from '../utils/responseUtils';

// @desc get all users
// @route GET /api/users
export async function getUsers(req: IncomingMessage, res: ServerResponse) {
  try {
    const users = await Users.findAllUsers();

    replyOkWithData(res, users);
  } catch (err) {
    replyInternalServerError(res);
  }
}

// @desc get single user
// @route GET /api/user/id
export async function getUser(req: IncomingMessage, res: ServerResponse, id: string) {
  try {
    const user = await Users.findById(id);

    replyOkWithData(res, user);
  } catch (err) {
    replyNotFoundOrInternalServerError(res, err);
  }
}

// @desc create a user
// @route POST /api/users
export async function createUser(req: IncomingMessage, res: ServerResponse) {
  try {
    const newUser = await getPostData(req);
    const user = await Users.createUser(newUser);

    replyOkWithData(res, user);
  } catch (err) {
    replyInternalServerError(res);
  }
}

// @desc update a user
// @route PUT /api/users/id
export async function updateUser(req: IncomingMessage, res: ServerResponse, userId: string) {
  try {
    const updateData = await getPostData(req);
    const updatedUser = await Users.updateUser(userId, updateData);

    replyOkWithData(res, updatedUser);
  } catch (err) {
    replyNotFoundOrInternalServerError(res, err);
  }
}

// @desc delete a user
// @route DELETE /api/users/id
export async function deleteUser(req: IncomingMessage, res: ServerResponse, userId: string) {
  try {
    await Users.deleteUser(userId);

    replyDeleted(res);
  } catch (err) {
    replyNotFoundOrInternalServerError(res, err);
  }
}
