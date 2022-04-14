import ExerciseDAO from '../dao/exerciseDAO.js'

export default class ExerciseCtrl {

  static async apiGetUsers(req, res, next) {
    const getUsersRes = await ExerciseDAO.getUsers()
    res.json(getUsersRes)
  }

  static async apiPostUser(req, res, next) {
    console.log(req.body)
    const user = {
      username: req.body.username,
      exercises: []
    }
    const addUserRes = await ExerciseDAO.addUser(user)
    res.send(addUserRes)
  }

  static async apiGetExercises(req, res, next) {
    const id = req.params._id
    const from = req.query.from ? new Date(req.query.from) : undefined
    const to = req.query.to ? new Date(req.query.to) : undefined
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined
    const getExercisesRes = await ExerciseDAO.getExercises(id, from, to, limit)
    res.send(getExercisesRes)
  }

  static async apiPostExercise(req, res, next) {
    const id = req.params._id
    const exercise = {
      description: req.body.description,
      duration: req.body.duration,
      date: req.body.date ? new Date(req.body.date) : new Date()
    }
    const addExerciseRes = await ExerciseDAO.addExercise(id, exercise)
    res.send(addExerciseRes)
  }

}
