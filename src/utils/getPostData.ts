import { IncomingMessage } from 'http';
import { MESSAGE_ERROR_400 } from '../const/messages';
import { NewUser } from '../types/user';
import isNewUser from './isNewUser';

export default function getPostData(req: IncomingMessage): Promise<NewUser> {
  return new Promise((resolve, reject) => {
    let body: string = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const data = JSON.parse(body);

      if (isNewUser(data)) {
        resolve(data);
      } else {
        reject(MESSAGE_ERROR_400);
      }
    });
  });
}
