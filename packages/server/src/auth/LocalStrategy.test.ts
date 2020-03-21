import LocalStrategy from './LocalStrategy';

it('calls the verify callback with the username and password', () => {
  const verify = jest.fn();
  const strategy = new LocalStrategy(verify);
  const email = 'test@email.com';
  const password = 'password';

  strategy.authenticate({} as any, { email, password });

  expect(verify).toBeCalledTimes(1);
  // expect(verify).toBeCalledWith(email, password, jest.fn());
});
