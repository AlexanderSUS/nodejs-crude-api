import { createServer } from 'http';
import router from './router/router';

const DEFAULT_PORT = 5000;
const PORT = process.env.PORT || DEFAULT_PORT;

createServer(router).listen(PORT, () => process.stdout.write(`Server running on port ${PORT}\n`));
