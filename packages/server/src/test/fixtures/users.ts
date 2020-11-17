import NewUserInput from 'src/resolvers/inputTypes/NewUserInput';

const email1 = 'user1@email.com';
const password1 = 'password';

export const user1Input: NewUserInput = {
  email: email1,
  plainTextPassword: password1,
};

const email2 = 'user2@email.com';
const password2 = 'password';

export const user2Input: NewUserInput = {
  email: email2,
  plainTextPassword: password2,
};
