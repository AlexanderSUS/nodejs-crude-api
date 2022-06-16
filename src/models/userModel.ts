import db from '../db/db';
import { User } from '../types/user';

export default function findAllUsers(): Promise<User[]> {
  return new Promise((res) => {
    res(db);
  });
}
