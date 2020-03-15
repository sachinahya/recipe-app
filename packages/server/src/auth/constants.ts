export const MIN_PASSWORD_LENGTH = 6;

export const MAX_PASSWORD_LENGTH = 64;

export const PASSWORD_SALT_ROUNDS = 12;

/**
 * bcrypt hashes are 60 characters long.
 * https://github.com/kelektiv/node.bcrypt.js
 */
export const HASHED_PASSWORD_LENGTH = 60;
