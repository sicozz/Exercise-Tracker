import ExerciseDAO from '../dao/exerciseDAO.js'
import UserDAO from '../dao/userDAO.js'

export default class ExerciseCtrl {

  static async apiGetUsers(req, res, _next) {
    const id = req.query._id
    const getUsersRes = await UserDAO.getUsers(id)
    res.json(getUsersRes)
  }

  static async apiPostUser(req, res, _next) {
    const user = {
      username: req.body.username,
      routine: []
      /*
      * {
        * exercise_id,
        * rounds,
        * reps,
      * }
      */
    }
    const addUserRes = await UserDAO.addUser(user)
    res.send(addUserRes)
  }

  static async apiGetExercises(req, res, _next) {
    const userId = req.query.userId
    const name = req.query.name
    const category = req.query.category

    const getExercisesRes = await ExerciseDAO.getExercises(
      userId,
      name,
      category
    )
    res.send(getExercisesRes)
  }

  static async apiPostExercise(req, res, _next) {
    const id = req.params._id

    const exercise = {
      "user_id": id,
      name: req.body.name,
      category: req.body.category
    }
    const addExerciseRes = await ExerciseDAO.addExercise(exercise)
    res.send(addExerciseRes)
  }

}
