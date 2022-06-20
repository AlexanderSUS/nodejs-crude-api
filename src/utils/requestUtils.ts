import { IncomingMessage } from 'http';
import { USERS_URL } from '../const/minor';

export const isGetUsersRequest = (req: IncomingMessage): boolean => (
  req.url === USERS_URL && req.method === 'GET'
);

export const isGetUserRequest = (req: IncomingMessage): boolean => (
  !!req.url?.startsWith(`${USERS_URL}/`) && req.method === 'GET'
);

export const isPostUserRequest = (req: IncomingMessage): boolean => (
  req.url === USERS_URL && req.method === 'POST'
);

export const isPutUserRequest = (req: IncomingMessage): boolean => (
  !!req.url?.startsWith(`${USERS_URL}/`) && req.method === 'PUT'
);

export const isDeleteUserRequest = (req: IncomingMessage): boolean => (
  !!req.url?.startsWith(`${USERS_URL}/`) && req.method === 'DELETE'
);

export const isUserGetOrPutOrDeleteRequest = (req: IncomingMessage): boolean => (
  isGetUserRequest(req) || isPutUserRequest(req) || isDeleteUserRequest(req)
);

export const isInvalidMethod = (req: IncomingMessage): boolean => (
  !!req.method && (
    (req.method !== 'GET' && req.url === USERS_URL)
  || (req.method === 'GET' && req.url === `${USERS_URL}/`)
  )
);
