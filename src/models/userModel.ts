import db from '../db/db';
import { User } from '../types/user';

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
