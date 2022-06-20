import { Worker } from 'cluster';
import { Db, DbPayload, WorkerMessage } from '../types/db';
import isGetUsersMethodKey from './isGetUsersMethod';

const workerMessageHandler = (
  database: Db,
  worker: Worker,
  { methodKey, payload } : WorkerMessage,
) => {
  if (isGetUsersMethodKey(methodKey)) {
    const data = database[methodKey]();

    worker.send(data);
  } else {
    const data = database[methodKey](payload as keyof DbPayload);

    if (data !== null) {
      worker.send(data);
    } else {
      worker.send(JSON.stringify(data));
    }
  }
};

export default workerMessageHandler;
