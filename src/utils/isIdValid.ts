import { validate } from 'uuid';

const isIdValid = (id: string | undefined): id is string => typeof id === 'string' && validate(id);

export default isIdValid;
