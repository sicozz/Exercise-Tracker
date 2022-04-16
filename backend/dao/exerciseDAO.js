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
    } catch (err) {
      console.error(
        `Unable to establish a collection handle in exerciseDAO.js: ${err}`
      )
    }
  }

  static async addExercise(exercise) {
    try {
      const insertResponse = await exercises.insertOne(exercise)
      return { _id: insertResponse.ops[0]._id }
    } catch (err) {
      console.error(`Error adding exercise: ${err}`)
      return { error: `Error adding exercise: ${err}` }
    }
  }

  static async getExercises(exerciseId, userId, name, category) {
    const query = {}
    if (exerciseId) query._id = ObjectId(exerciseId)
    if (userId) query.user_id = userId
    if (name) query.name = name
    if (category) query.category = category

    let cursor
    try {
      cursor = await exercises.find(query)
    } catch (err) {
      console.error(`Unable to list exercises: ${err}`)
      return { error: `Unable to list exercises: ${err}` }
    }
    return cursor.toArray()
  }

}
