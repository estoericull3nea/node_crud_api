const { CustomError } = require('../errors/custom_errors')

const error_handler_middleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.status_code).json({ msg: err.message })
  }
  return res
    .status(500)
    .json({ msg: `Something went wrong, please try again later` })
}

module.exports = error_handler_middleware
