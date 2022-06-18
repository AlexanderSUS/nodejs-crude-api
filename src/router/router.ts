import { IncomingMessage, ServerResponse } from 'http';
import {
  getUsers, getUser, createUser, updateUser, deleteUser,
} from '../controllers/userController';
import { ID_PARAM_ORDER } from '../const/minor';
import {
  isDeleteUserRequest, isGetUserRequest, isGetUsersRequest,
  isInvalidMethod, isPostUserRequest,
  isPutUserRequest, isUserGetOrPutOrDeleteRequest,
} from '../utils/requestUtils';
import { replyBadRequest, replyNotFound } from '../utils/responseUtils';
import isIdValid from '../utils/isIdValid';

const router = (req: IncomingMessage, res: ServerResponse) => {
  if (req.url) process.stdout.write(`${req.method}  ${req.url}\n`);

  if (isGetUsersRequest(req)) {
    getUsers(req, res);
  } else if (isPostUserRequest(req)) {
    createUser(req, res);
  } else if (isUserGetOrPutOrDeleteRequest(req)) {
    const id = req.url?.split('/')[ID_PARAM_ORDER];

    if (!isIdValid(id)) {
      replyBadRequest(res);
    } else if (isGetUserRequest(req)) {
      getUser(req, res, id);
    } else if (isPutUserRequest(req)) {
      updateUser(req, res, id);
    } else if (isDeleteUserRequest(req)) {
      deleteUser(req, res, id);
    }
  } else if (isInvalidMethod(req)) {
    replyBadRequest(res);
  } else {
    replyNotFound(res);
  }
};

export default router;
