import ExerciseDAO from '../dao/exerciseDAO.js'
import UserDAO from '../dao/userDAO.js'
import ExerciseUtils from '../utils/exercise.js'
import UserUtils from '../utils/user.js'

export default class ExerciseCtrl {

  static async apiGetUsers(req, res, _next) {
    const id = req.query._id
    const getUsersRes = await UserDAO.getUsers(id)
    res.json(getUsersRes)
  }

  static async apiPostUser(req, res, _next) {
    const username = req.body.username
    if (username == undefined) {
      res.send({ error: "To create a user you must provide a username" })
      return
    }

    const { status, error } = UserUtils.checkUsername(username)
    if (!status) {
      res.send({ error })
      return
    }

    const user = {
      username,
      routine: []
    }

    const addUserRes = await UserDAO.addUser(user)
    res.send(addUserRes)
  }

  static async apiPutRoutine(req, res, _next) {
    const userId = req.body.user_id
    const routine = req.body.routine

    const isRoutineOk = routine.reduce(
      (isOk, exercise) => (
        isOk &&
        exercise.hasOwnProperty('exercise_id') &&
        exercise.hasOwnProperty('rounds') &&
        exercise.hasOwnProperty('reps')
      ),
      true
    )

    if (!isRoutineOk) {
      res.send({
        error: "Exercises in routine must have: exercise_id, rounds, reps"
      })
      return
    }

    const resp = await UserDAO.updateRoutine(userId, routine)
    res.send(resp)
  }

  static async apiGetExercises(req, res, _next) {
    const userId = req.query.userId
    const name = req.query.name
    const category = req.query.category

    const getExercisesRes = await ExerciseDAO.getExercises(
      undefined,
      userId,
      name,
      category
    )
    res.send(getExercisesRes)
  }

  static async apiPostExercise(req, res, _next) {
    const userId = req.body._id
    const name = req.body.name
    const category = req.body.category

    const exercise = ExerciseUtils.exerciseSanitization(
      userId,
      name,
      category
    )

    if (exercise.error) {
      res.send(`Error while posting exercise: ${exercise.error}`)
      return
    }

    if (!ExerciseUtils.isCategoryOk(exercise.category)) {
      res.send(`Error while posting exercise: category should be one of \{cardio, calisthenics, weights\}`)
      return
    }

    const addExerciseRes = await ExerciseDAO.addExercise(exercise)
    res.send(addExerciseRes)
  }

  static async apiLogRoutine(req, res, _next) {
    const userId = req.params._id

    const routineResp = await UserDAO.getRoutine(userId)
    if (routineResp.hasOwnProperty('error')) {
      res.send(routineResp.error)
      return
    }

    const { routine } = routineResp
    const exercisesIds = routine.map(exercise => exercise.exercise_id)
    const exercisesResp = await Promise.all(
      exercisesIds.map(
        async (exercisesId) => ExerciseDAO.getExercises(exercisesId)
      )
    )
    const exercises = exercisesResp.flat()
    console.log(exercises)
    const log = exercises.map(
      (exercise, i) => Object.assign(exercise, routine[i])
    )

    res.send({ log })
  }

}
