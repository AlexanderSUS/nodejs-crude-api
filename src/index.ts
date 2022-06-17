import { createServer } from 'http';
import {
  getUsers, getUser, createUser, updateUser, deleteUser,
} from './controllers/userController';
import { ID_PARAM_ORDER } from './const/minor';
import {
  isDeleteUserRequest, isGetUserRequest, isGetUsersRequest,
  isPostUserRequest, isPutUserRequest, isUserGetOrPutOrDeleteRequest,
} from './utils/requestUtils';
import { replyBadRequest, replyNotFound } from './utils/responseUtils';
import isIdValid from './utils/isIdValid';

const server = createServer();

server.on('request', (req, res) => {
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
  } else {
    replyNotFound(res);
  }
});

// TODO add .env file
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log('Server running on port 5000'));
