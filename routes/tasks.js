const router = require('express').Router()
const {
  getAllTasks,
  createTask,
  getOneTask,
  deleteOneTask,
  updateOneTask,
} = require('../controllers/tasks')

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getOneTask).patch(updateOneTask).delete(deleteOneTask)

module.exports = router
