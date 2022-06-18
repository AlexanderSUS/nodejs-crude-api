import { ServerResponse } from 'http';
import { MESSAGE_ERROR_400, MESSAGE_ERROR_404, MESSAGE_ERROR_500 } from '../const/messages';
import {
  CODE_200, CODE_201, CODE_204, CODE_400, CODE_404, CODE_500,
} from '../const/statusCodes';
import { User } from '../types/user';

export const replyNotFound = (res: ServerResponse) => {
  res.writeHead(CODE_404, { 'Content-type': 'application/json' });
  res.end(JSON.stringify({ message: MESSAGE_ERROR_404 }));
};

export const replyBadRequest = (res: ServerResponse) => {
  res.writeHead(CODE_400, { 'Content-type': 'application/json' });
  res.end(JSON.stringify({ message: MESSAGE_ERROR_400 }));
};

export const replyInternalServerError = (res: ServerResponse) => {
  res.writeHead(CODE_500, { 'Content-type': 'application/json' });
  res.end(JSON.stringify({ message: MESSAGE_ERROR_500 }));
};

export const replyOkWithData = (res: ServerResponse, data: User | User[]) => {
  res.writeHead(CODE_200, { 'Content-type': 'application/json' });
  res.end(JSON.stringify(data));
};

export const replyCreatedWithData = (res: ServerResponse, data: User) => {
  res.writeHead(CODE_201, { 'Content-type': 'application/json' });
  res.end(JSON.stringify(data));
};

export const replyDeleted = (res: ServerResponse) => {
  res.writeHead(CODE_204, { 'Content-type': 'application/json' });
  res.end();
};

export const replyNotFoundOrInternalServerError = (res: ServerResponse, err: unknown) => {
  if (err === MESSAGE_ERROR_404) {
    replyNotFound(res);
  } else if (err === MESSAGE_ERROR_400) {
    replyBadRequest(res);
  } else {
    replyInternalServerError(res);
  }
};
