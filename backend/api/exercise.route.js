import express from 'express'
// Locals
import ExerciseCtrl from './exercise.controller.js'

const router = express.Router()

router.route("/users")
  .get(ExerciseCtrl.apiGetUsers)
  .post(ExerciseCtrl.apiPostUser)
router.route("/exercises")
  .get(ExerciseCtrl.apiGetExercises)
  .post(ExerciseCtrl.apiPostExercise)
//router.route("analitics")

export default router
