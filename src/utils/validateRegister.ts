import { UsernamePasswordInput } from './../resolvers/UsernamePasswordInput';

export const validateRegister = (options: UsernamePasswordInput) => {
  if (options.username.length <= 2) {
    return [
      {
        field: 'username',
        message: 'length must be greater than 2',
      },
    ];
  }

  if (/[^a-zA-Z0-9]/.test(options.username)) {
    return [
      {
        field: 'username',
        message: 'only alphanumeric accepted',
      },
    ];
  }

  if (!options.email.includes('@')) {
    return [
      {
        field: 'email',
        message: 'not a valid email',
      },
    ];
  }

  if (options.password.length <= 2) {
    return [
      {
        field: 'password',
        message: 'length must be greater than 2s',
      },
    ];
  }

  return null;
};
