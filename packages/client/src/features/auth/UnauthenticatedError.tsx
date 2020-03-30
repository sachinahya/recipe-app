export default class UnauthenticatedError extends Error {
  constructor(message: string = 'User login is required.') {
    super(message);
  }
}
