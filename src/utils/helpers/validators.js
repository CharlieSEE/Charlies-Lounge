//@ts-check
/* eslint-disable no-useless-escape */

/**
 * Function validating email with General Email Regex (RFC 5322 Official Standard)
 * @param {String} email Email to be validated
 * @returns true if email is valid
 */
const validateEmail = (email) => {
  const testRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
  return testRegex.test(email);
};

/**
 * Function checking if password is at least 6 characters long
 * @param {String} password String containing password
 * @returns true if password is at least 6 characters long
 */
const validatePassword = (password) => {
  return password.length > 6;
};

/**
 * Function checking if username is at least 3 characters long
 * @param {String} username String containing username
 * @returns true if username is valid
 */
const validateUsername = (username) => {
  return username.length > 3;
};

export { validateEmail, validatePassword, validateUsername };
