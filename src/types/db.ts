import { NewUser, User } from './user';

export type UpdateUserPayload = {
  id: string,
  userData: NewUser,
};

export interface Db {
  users:User[];
  getUsers: () => User[];
  getUser: (id: string) => User | null;
  addUser: (user: User) => User | null;
  updateUser: ({ id, userData }: UpdateUserPayload) => User | null;
  deleteUser: (id: string) => boolean;
}

export type DbKey = keyof Db;

export type DbMethodKey = Exclude<DbKey, 'users'>;

export type DbMethods = Exclude<Db, 'users'>;

export type GetUsersReturnType = ReturnType<DbMethods['getUsers']>;

export type GetUserReturnType = ReturnType<DbMethods['getUser']>;

export type AddUserReturnType = ReturnType<DbMethods['addUser']>;

export type UpdateUserReturnType = ReturnType<DbMethods['updateUser']>;

export type DeleteUserReturnType = ReturnType<DbMethods['deleteUser']>;

export type GetUsersMethodKey = 'getUsers';

export type DbMethodKeyWithPayload = Exclude<DbMethodKey, GetUsersMethodKey>;

export type DbPayload = Parameters<Db[DbMethodKeyWithPayload]>[0];

export type WorkerMessage = {
  methodKey: DbMethodKey,
  payload?: DbPayload,
};

export type GenericWorkerMessage<T = DbPayload> = {
  methodKey: DbMethodKey,
  payload: T,
};

export type WorkerMessagePayloadless = {
  methodKey: DbMethodKey,
};
