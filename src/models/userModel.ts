import { v4 as uuidv4 } from 'uuid';
import { NewUser, User } from '../types/user';
import { MESSAGE_ERROR_404, MESSAGE_ERROR_500 } from '../const/messages';
import { CODE_204 } from '../const/statusCodes';
import UserDbMethodKey from '../const/DbMethodKey';
import {
  AddUserReturnType,
  DeleteUserReturnType,
  GenericWorkerMessage, GetUserReturnType,
  GetUsersReturnType, UpdateUserPayload,
  UpdateUserReturnType,
  WorkerMessagePayloadless,
} from '../types/db';

export function findAllUsers(): Promise<User[]> {
  return new Promise((res) => {
    const message: WorkerMessagePayloadless = { methodKey: UserDbMethodKey.getUsers };

    process.send?.(message);

    process.on('message', (data: GetUsersReturnType) => {
      res(data);
    });
  });
}

export function findById(id: string): Promise<User> {
  return new Promise((res, rej) => {
    const message: GenericWorkerMessage<string> = {
      methodKey: UserDbMethodKey.getUser,
      payload: id,
    };

    process.send?.(message);

    process.on('message', (data: GetUserReturnType) => {
      if (data) {
        res(data);
      }

      rej(MESSAGE_ERROR_404);
    });
  });
}

export function createUser(newUserData: NewUser): Promise<User> {
  return new Promise((res, rej) => {
    const user: User = { id: uuidv4(), ...newUserData };

    const message: GenericWorkerMessage<User> = {
      methodKey: UserDbMethodKey.addUser,
      payload: user,
    };

    process.send?.(message);

    process.on('message', (data: AddUserReturnType) => {
      if (data) {
        res(user);
      }

      rej(MESSAGE_ERROR_500);
    });
  });
}

export function updateUser(id: string, userData: NewUser): Promise<User> {
  return new Promise((res, rej) => {
    const message: GenericWorkerMessage<UpdateUserPayload> = {
      methodKey: UserDbMethodKey.updateUser,
      payload: { id, userData },
    };

    process.send?.(message);

    process.on('message', (data: UpdateUserReturnType | typeof MESSAGE_ERROR_404) => {
      if (data && data !== MESSAGE_ERROR_404) {
        res(data);
      }

      rej(MESSAGE_ERROR_404);
    });
  });
}

export function deleteUser(id: string): Promise<number> {
  return new Promise((res, rej) => {
    const message: GenericWorkerMessage<string> = {
      methodKey: UserDbMethodKey.deleteUser,
      payload: id,
    };

    process.send?.(message);

    process.on('message', (data: DeleteUserReturnType) => {
      if (data && typeof data === 'boolean') {
        res(CODE_204);
      }

      rej(MESSAGE_ERROR_404);
    });
  });
}
