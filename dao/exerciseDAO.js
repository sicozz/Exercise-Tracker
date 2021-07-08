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
            console.error(
                `Unable to establish a collection handle in exerciseDAO.js: ${err}`
            )
        }
    }

    static async getUsers() {
        let cursor
        try {
            cursor = await exercises.find(
                {},
                { projection: { _id: 1, username: 1 } }
            )
        } catch(err) {
            console.error(`Unable to find users: ${err}`)
            return []
        }
        return cursor.toArray()
    }

    static async addUser(user) {
        try {
            const insertResponse = await exercises.insertOne(user)
            return {
                username: insertResponse.ops[0].username,
                _id: insertResponse.ops[0]._id
            }
        } catch(err) {
            console.error(`Unable to add user: ${err}`)
            return { error: `Unable to insert user: ${err}` }
        }
    }

    static async addExercise(userId, ex) {
        try {
            await exercises.updateOne(
                { _id: ObjectId(userId) },
                { $push: { exercises: ex } }
            )
            const user = await exercises.findOne({ _id: ObjectId(userId)})
            return {
                _id: user._id,
                username: user.username,
                date: ex.date.toDateString(),
                duration: parseInt(ex.duration),
                description: ex.description
            }
        } catch(err) {
            console.error(`Error adding exercise: ${err}`)
            return { error: `Error adding exercise: ${err}` }
        }
    }

    static async getExercises(userId, from, to, limit) {
        try {
            const user = await exercises.findOne({ _id: ObjectId(userId) })

            let userExercises = user.exercises
                .map(obj => Object.assign({}, obj, {date: new Date(obj.date)}))

            if (from && to) {
                userExercises = userExercises
                    .filter(({date}) => date >= from && date < to)
            } else if (from) {
                userExercises = userExercises
                    .filter(({date}) => date >= from)
            } else if (to) {
                userExercises = userExercises
                    .filter(({date}) => date <= to)
            }


            const mapped = this.exercisesDatesMap(userExercises.slice(0, limit))

            let ans = {
                _id: ObjectId(user.id),
                username: user.username,
            }

            if (from) {
                ans.from = from.toDateString()
            }
            if (to) {
                ans.to = to.toDateString()
            }

            ans.count = mapped.length
            ans.log = mapped
            
            return ans
        } catch(err) {
            console.error(`Unable to list exercises: ${err}`)
            return { error: `Unable to list exercises: ${err}` }
        }
    }

    static exercisesDatesMap(exArr) {
        return exArr
            .map(obj => {
                return Object.assign(
                    {},
                    obj,
                    {date: obj.date.toDateString()}
                )
            })
    }
}
