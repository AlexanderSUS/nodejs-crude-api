import { v4 as uuidv4 } from 'uuid';
import db from '../db/db';
import { NewUser, User } from '../types/user';

export function findAllUsers(): Promise<User[]> {
  return new Promise((res) => {
    res(db);
  });
}

export function findById(id: string): Promise<User> {
  return new Promise((res) => {
    res(db[db.findIndex((user) => user.id === id)]);
  });
}

export function createUser(newUserData: NewUser): Promise<User> {
  return new Promise((res) => {
    const newUser = { id: uuidv4(), ...newUserData };
    db.push(newUser);
    res(newUser as User);
  });
}
