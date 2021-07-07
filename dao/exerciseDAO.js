import mongodb from 'mongodb'

const ObjectId = mongodb.ObjectID
let exercises

export default class ExerciseDAO {

    static async injectDB(conn) {
        if (exercises) {
            return
        }

        try {
            exercises = await conn.db(process.env.DB_NS).collection("exercises")
        } catch(err) {
            console.log(
                `Unable to establish a collection handle in exerciseDAO.js: ${err}`
            )
        }
    }

    /*
    static async getUsers() {
    }

    static async addUser(user) {
    }

    static async getExercises(userId, from, to) {
    }
    */

}
