import { v4 as uuidv4 } from 'uuid';
import { NewUser, User } from '../types/user';
import { MESSAGE_ERROR_404 } from '../const/messages';
import { CODE_204 } from '../const/statusCodes';

import initialData from '../const/initialData';

let db: User[] = initialData;

export function findAllUsers(): Promise<User[]> {
  return new Promise((res) => {
    res(db);
  });
}

export function findById(id: string): Promise<User> {
  return new Promise((res, rej) => {
    const index = db.findIndex((user) => user.id === id);

    if (index === -1) {
      rej(MESSAGE_ERROR_404);
    }
    res(db[index]);
  });
}

export function createUser(newUserData: NewUser): Promise<User> {
  return new Promise((res) => {
    const newUser = { id: uuidv4(), ...newUserData };

    db.push(newUser);
    res(newUser as User);
  });
}

export function updateUser(id: string, userData: NewUser): Promise<User> {
  return new Promise((res, rej) => {
    const index = db.findIndex((user) => user.id === id);

    if (index === -1) {
      rej(MESSAGE_ERROR_404);
    }

    db[index] = { id, ...userData };

    res(db[index]);
  });
}

export function deleteUser(id: string): Promise<number> {
  return new Promise((res, rej) => {
    const index = db.findIndex((user) => user.id === id);

    if (index === -1) {
      rej(MESSAGE_ERROR_404);
    }

    db = db.filter((user) => user.id !== id);

    res(CODE_204);
  });
}
