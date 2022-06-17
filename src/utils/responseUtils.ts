import { ServerResponse } from 'http';
import { MESSAGE_ERROR_400, MESSAGE_ERROR_404 } from '../const/messages';
import { CODE_400, CODE_404 } from '../const/statusCodes';

export const replyNotFound = (res: ServerResponse) => {
  res.writeHead(CODE_404, { 'Content-type': 'application/json' });
  res.end(JSON.stringify({ message: MESSAGE_ERROR_404 }));
};

export const replyBadRequest = (res: ServerResponse) => {
  res.writeHead(CODE_400, { 'Content-type': 'application/json' });
  res.end(JSON.stringify({ message: MESSAGE_ERROR_400 }));
};
