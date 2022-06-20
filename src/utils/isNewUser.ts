import { NewUserKeysQty } from '../const/minor';
import { NewUser } from '../types/user';

const isNewUser = (data: any | NewUser): data is NewUser => (
  Object.keys(data).length === NewUserKeysQty
  && 'username' in data
  && typeof data.username === 'string'
  && 'age' in data && typeof data.age === 'number'
  && 'hobbies' in data && Array.isArray(data.hobbies)
  && data.hobbies.every((item: unknown) => typeof item === 'string')
);

export default isNewUser;
