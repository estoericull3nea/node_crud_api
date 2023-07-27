const not_found = (req, res, next) => {
  res.status(404).send('This URL does not exist, 404 Not Found!')
}
module.exports = not_found
