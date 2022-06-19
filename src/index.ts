import { createServer } from 'node:http';
import cluster from 'node:cluster';
import os from 'node:os';
import router from './router/router';
import Database from './db/db';
import { DbPayload, WorkerMessage } from './types/db';
import isGetUsersMethodKey from './utils/isGetUsersMethod';
import { MESSAGE_ERROR_404 } from './const/messages';
import { DEFAULT_PORT } from './const/minor';

const PORT = process.env.PORT || DEFAULT_PORT;

const { pid } = process;

const database = new Database();

if (cluster.isPrimary) {
  const count = os.cpus().length;
  process.stdout.write(`Master pid: ${pid}\n`);
  process.stdout.write(`Starting ${count} forks\n`);

  for (let i = 0; i < count; i += 1) {
    const worker = cluster.fork();

    worker.on('message', (msg: WorkerMessage) => {
      const { methodKey, payload } = msg;

      if (isGetUsersMethodKey(methodKey)) {
        const data = database[methodKey]();

        worker.send(data);
      } else {
        const data = database[methodKey](payload as keyof DbPayload);

        if (data !== null) {
          worker.send(data);
        } else {
          worker.send(MESSAGE_ERROR_404);
        }
      }
    });
  }
} else {
  process.stdout.write(`Worker: ${cluster.worker?.id}, pid: ${pid}, port: ${PORT}\n`);
  createServer(router).listen(PORT);
}
