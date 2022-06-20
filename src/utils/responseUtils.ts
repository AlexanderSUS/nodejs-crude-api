import { ServerResponse } from 'http';
import { MESSAGE_ERROR_400, MESSAGE_ERROR_404, MESSAGE_ERROR_500 } from '../const/messages';
import {
  CODE_200, CODE_201, CODE_204, CODE_400, CODE_404, CODE_500,
} from '../const/statusCodes';
import { User } from '../types/user';

const fillResponse = (res: ServerResponse, code: number, data?: User | User[] | string) => {
  res.writeHead(code, { 'Content-type': 'application/json' });
  res.end(data ? JSON.stringify(data) : null);
};

export const replyNotFound = (res: ServerResponse) => {
  fillResponse(res, CODE_404, MESSAGE_ERROR_404);
};

export const replyBadRequest = (res: ServerResponse) => {
  fillResponse(res, CODE_400, MESSAGE_ERROR_400);
};

export const replyInternalServerError = (res: ServerResponse) => {
  fillResponse(res, CODE_500, MESSAGE_ERROR_500);
};

export const replyOkWithData = (res: ServerResponse, data: User | User[]) => {
  fillResponse(res, CODE_200, data);
};

export const replyCreatedWithData = (res: ServerResponse, data: User) => {
  fillResponse(res, CODE_201, data);
};

export const replyDeleted = (res: ServerResponse) => {
  fillResponse(res, CODE_204);
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
