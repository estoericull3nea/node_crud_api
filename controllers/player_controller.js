const PlayerModel = require('../models/player_model')
const async_wrapper = require('../middlewares/async')

const { create_custom_error } = require('../errors/custom_errors')

const viewAllPlayers = async_wrapper(async (req, res) => {
  const players = await PlayerModel.find({})
  res.status(200).json({ players })
})

const createPlayer = async_wrapper(async (req, res) => {
  await PlayerModel.create(req.body)
  res.status(201).json({ msg: `${req.body.firstname} added!` })
})

const viewPlayer = async_wrapper(async (req, res, next) => {
  const { id: playerId } = req.params
  const player = await PlayerModel.findOne({ _id: playerId })
  if (!player) {
    return next(create_custom_error(`No player with id ${playerId}`, 404))
  }
  res.status(200).json({ player })
})

const updatePlayer = async_wrapper(async (req, res) => {
  const { id: playerId } = req.params
  const player = await PlayerModel.findOneAndUpdate(
    { _id: playerId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )
  if (!player) {
    return next(create_custom_error(`No player with id ${playerId}`, 404))
  }
  res.status(200).json({ msg: `${req.body.firstname} Updated Successfuly!` })
})

const deletePlayer = async_wrapper(async (req, res) => {
  const { id: playerId } = req.params
  const player = await PlayerModel.findByIdAndDelete({ _id: playerId })
  if (!player) {
    return next(create_custom_error(`No task with id ${playerId}`, 404))
  }
  res.status(200).json({ msg: `${req.body.firstname} is Deleted Successfuly!` })
})
module.exports = {
  viewAllPlayers,
  createPlayer,
  viewPlayer,
  deletePlayer,
  updatePlayer,
}
