const URL_REGEX = /(http(s)?:\/\/.)?(www.)?[-a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;

const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const ERROR_MESSAGES = {
  SERVER_ERROR: 'We have encountered an error',
  INVALID_CARD_ID: 'Invalid card ID',
  CARD_NOT_FOUND: 'Card not found',
  INVALID_USER_ID: 'Invalid user ID',
};

module.exports = {
  URL_REGEX,
  STATUS_CODES,
  ERROR_MESSAGES,
};
