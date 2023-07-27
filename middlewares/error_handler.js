const error_handler_middleware = (err, req, res, next) => {
  return res
    .status(500)
    .json({ msg: 'Please try again later, something went wrong!' })
}

module.exports = error_handler_middleware
