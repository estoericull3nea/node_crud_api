const TasksModel = require('../models/Task') // taskmodel

const getAllTasks = async (req, res) => {
  // getting all tasks method
  try {
    const tasks = await TasksModel.find({})
    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const createTask = async (req, res) => {
  // creating task method
  try {
    await TasksModel.create(req.body)
    res.json({ msg: 'Task Added!' })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const getOneTask = async (req, res) => {
  // getting one task by id
  try {
    // const id = req.params.id
    const { id: taskId } = req.params
    const task = await TasksModel.findOne({ _id: taskId })
    if (!task) {
      return res.status(404).json({ msg: `Not found of that id of ${taskId}` })
    }
    res.status(200).json({ task })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const updateOneTask = async (req, res) => {
  // update one task by id
  try {
    const { id: taskId } = req.params
    const task = await TasksModel.findOneAndUpdate({ _id: taskId }, req.body, {
      new: true,
      runValidators: true,
    })
    if (!task) {
      return res.status(404).json({ msg: `Not found of that id of ${taskId}` })
    }
    res.status(200).json({ msg: `${task._id} is Updated Successfuly!` })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

const deleteOneTask = async (req, res) => {
  // deleting task by id
  try {
    const { id: taskId } = req.params
    const task = await TasksModel.findByIdAndDelete({ _id: taskId })
    if (!task) {
      return res.status(404).json({ msg: `Not found of that id ${taskId}` })
    }
    res.status(200).json({ msg: `${task.name} is Deleted Successfuly!` })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

module.exports = {
  getAllTasks,
  createTask,
  getOneTask,
  deleteOneTask,
  updateOneTask,
}
