import express from 'express'
// Locals
import ExerciseCtrl from './exercise.controller.js'
import ExerciseDAO from '../dao/exerciseDAO.js'

const router = express.Router()

router.route("/users")
    .get(ExerciseCtrl.apiGetUsers)
    .post(ExerciseCtrl.apiPostUser)
router.route("/users/:_id/logs").get(ExerciseCtrl.apiGetExercises)
router.route("/users/:_id/exercises").post(ExerciseCtrl.apiPostExercise)

export default router
