const urlRegex = /(http(s)?:\/\/.)?(www.)?[-a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;

const customError = (res, number, txt) => res.status(number).send({ message: txt });

const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};


module.exports = {
  customError,
  urlRegex,
  HTTP_STATUS_CODES,
};
