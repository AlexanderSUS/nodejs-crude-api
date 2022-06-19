import { DbMethodKey, GetUsersMethodKey } from '../types/db';

function isGetUsersMethodKey(methodKey: DbMethodKey): methodKey is GetUsersMethodKey {
  return methodKey === 'getUsers';
}

export default isGetUsersMethodKey;
