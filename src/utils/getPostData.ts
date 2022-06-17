import { IncomingMessage } from 'http';
import { MESSAGE_ERROR_400 } from '../const/messages';
import { NewUser } from '../types/user';

export default function getPostData(req: IncomingMessage): Promise<NewUser> {
  return new Promise((resolve, reject) => {
    let body: string = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const newUser = JSON.parse(body);

      if ('username' in newUser && typeof newUser.username === 'string'
        && 'age' in newUser && typeof newUser.age === 'number'
        && 'hobbies' in newUser) {
        resolve(newUser);
      } else {
        reject(MESSAGE_ERROR_400);
      }
    });
  });
}
