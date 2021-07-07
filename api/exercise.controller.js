import ExerciseDAO from '../dao/exerciseDAO.js'
import dateFormat from 'dateformat'

export default class ExerciseCtrl {

    static async apiGetUsers(req, res, next) {
        const getUsersRes = await ExerciseDAO.getUsers()
        res.json(getUsersRes)
    }

    static async apiPostUser(req, res, next) {
        const user = {
            username: req.body.username
        }
        const addUserRes = await ExerciseDAO.addUser(user)
        res.send(addUserRes)
    }

    static async apiGetExercises(req, res, next) {
        const id = req.params._id
        const from = req.query.from || null
        const to = req.query.to || null
        const getExercisesRes = await ExerciseDAO.getExercises(id, from, to)
        res.send(getExercisesRes)
    }

    static async apiPostExercise(req, res, next) {
        const exercise = {
            description: req.body.description,
            duration: req.body.duration,
            date: req.doby.date || dateFormat(new Date(), 'yyyy-mm-dd')
        }
        const addExerciseRes = await ExerciseDAO.addExercise(exercise)
        res.send(addExerciseRes)
    }

}
