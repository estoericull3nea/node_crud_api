const TasksModel = require('../models/Task') // taskmodel
const async_wrapper = require('../middlewares/async')

const { create_custom_error } = require('../errors/custom_errors')

const getAllTasks = async_wrapper(async (req, res) => {
  const tasks = await TasksModel.find({})
  res.status(200).json({ tasks })
})

const createTask = async_wrapper(async (req, res) => {
  await TasksModel.create(req.body)
  res.json({ msg: 'Task Added!' })
})

const getOneTask = async_wrapper(async (req, res, next) => {
  const { id: taskId } = req.params
  const task = await TasksModel.findOne({ _id: taskId })
  if (!task) {
    // const error = new Error('Not Found!')
    // error.status = 404
    // return next(error)
    return next(create_custom_error(`No task with id ${taskId}`, 404))
  }
  res.status(200).json({ task })
})

const updateOneTask = async_wrapper(async (req, res) => {
  const { id: taskId } = req.params
  const task = await TasksModel.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  })
  if (!task) {
    return next(create_custom_error(`No task with id ${taskId}`, 404))
  }
  res.status(200).json({ msg: `${task._id} is Updated Successfuly!` })
})

const deleteOneTask = async_wrapper(async (req, res) => {
  const { id: taskId } = req.params
  const task = await TasksModel.findByIdAndDelete({ _id: taskId })
  if (!task) {
    return next(create_custom_error(`No task with id ${taskId}`, 404))
  }
  res.status(200).json({ msg: `${task.name} is Deleted Successfuly!` })
})
module.exports = {
  getAllTasks,
  createTask,
  getOneTask,
  deleteOneTask,
  updateOneTask,
}
