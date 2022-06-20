export interface NewUser {
  username: string,
  age: number,
  hobbies: string[]
}

export interface User extends NewUser {
  id: string,
}
