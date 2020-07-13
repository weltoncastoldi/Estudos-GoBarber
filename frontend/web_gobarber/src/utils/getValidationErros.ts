import { ValidationError } from 'yup';

interface MyErros {
  [key: string]: string;
}

export default function getValidationErros(err: ValidationError): MyErros {
  const validationErrors: MyErros = {};

  err.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
