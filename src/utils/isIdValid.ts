const isIdValid = (id: string | undefined): id is string => typeof id === 'string' && !!id.length;

export default isIdValid;
