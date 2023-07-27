const TasksModel = require('../models/Task') // taskmodel
const async_wrapper = require('../middlewares/async')

const getAllTasks = async_wrapper(async (req, res) => {
  // getting all tasks method
  const tasks = await TasksModel.find({})
  res.status(200).json({ tasks })
})

const createTask = async_wrapper(async (req, res) => {
  // creating task method
  await TasksModel.create(req.body)
  res.json({ msg: 'Task Added!' })
})

const getOneTask = async_wrapper(async (req, res) => {
  // getting one task by id
  // const id = req.params.id
  const { id: taskId } = req.params
  const task = await TasksModel.findOne({ _id: taskId })
  if (!task) {
    return res.status(404).json({ msg: `Not found of that id of ${taskId}` })
  }
  res.status(200).json({ task })
})

const updateOneTask = async_wrapper(async (req, res) => {
  // update one task by id
  const { id: taskId } = req.params
  const task = await TasksModel.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  })
  if (!task) {
    return res.status(404).json({ msg: `Not found of that id of ${taskId}` })
  }
  res.status(200).json({ msg: `${task._id} is Updated Successfuly!` })
})

const deleteOneTask = async_wrapper(async (req, res) => {
  // deleting task by id
  const { id: taskId } = req.params
  const task = await TasksModel.findByIdAndDelete({ _id: taskId })
  if (!task) {
    return res.status(404).json({ msg: `Not found of that id ${taskId}` })
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
