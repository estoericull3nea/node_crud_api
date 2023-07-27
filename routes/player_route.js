const router = require('express').Router()
const {
  viewAllPlayers,
  createPlayer,
  viewPlayer,
  updatePlayer,
  deletePlayer,
} = require('../controllers/player_controller')

router.route('/').get(viewAllPlayers).post(createPlayer)
router.route('/:id').get(viewPlayer).patch(updatePlayer).delete(deletePlayer)

module.exports = router
