import express from 'express'
// Locals
import ExerciseCtrl from './exercise.controller.js'

const router = express.Router()

router.route("/users")
  .get(ExerciseCtrl.apiGetUsers)
  .post(ExerciseCtrl.apiPostUser)
  .put(ExerciseCtrl.apiPutRoutine)
router.route("/exercises")
  .get(ExerciseCtrl.apiGetExercises)
  .post(ExerciseCtrl.apiPostExercise)
router.route("/analytics/user/:_id/log")
  .get(ExerciseCtrl.apiLogRoutine)
//router.route("/analytics/user/:id/measure")
//  .get(ExerciseCtrl.apiMeasureRoutine)

export default router
