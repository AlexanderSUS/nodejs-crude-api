import { User } from '../types/user';
import { Db, UpdateUserPayload } from '../types/db';
import initialData from '../const/initialData';

class Database implements Db {
  users: User[];

  constructor() {
    this.users = initialData;
  }

  getUsers(): User[] {
    return [...this.users];
  }

  getUser(id: string): User | null {
    const index = this.users.findIndex((user) => user.id === id);

    return index === -1 ? null : { ...this.users[index] };
  }

  addUser(user: User): true {
    this.users.push(user);
    return true;
  }

  updateUser({ id, userData }: UpdateUserPayload): User | null {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      return null;
    }

    this.users[index] = { ...this.users[index], ...userData };

    return { ...this.users[index] };
  }

  deleteUser(id: string): boolean {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      return false;
    }

    this.users = this.users.filter((user) => user.id !== id);

    return true;
  }
}

export default Database;
