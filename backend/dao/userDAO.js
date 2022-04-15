import mongodb from 'mongodb'

const ObjectId = mongodb.ObjectID
let users

export default class UserDAO {

  static async injectDB(conn) {
    if (users) {
      return
    }

    try {
      users = await conn.db(process.env.DB_NS).collection("users")
    } catch (err) {
      console.error(
        `Unable to establish a collection handle in exerciseDAO.js: ${err}`
      )
    }
  }

  static async getUsers(userId) {
    const query = (userId != undefined) ? { _id: ObjectId(userId) } : {}

    let cursor
    try {
      cursor = await users.find(
        query,
        { projection: { _id: 1, username: 1 } }
      )
    } catch (err) {
      console.error(`Unable to find users: ${err}`)
      return []
    }
    return cursor.toArray()
  }

  static async addUser(user) {
    try {
      const insertResponse = await users.insertOne(user)
      return {
        _id: insertResponse.ops[0]._id,
        username: insertResponse.ops[0].username
      }
    } catch (err) {
      console.error(`Unable to add user: ${err}`)
      return { error: `Unable to insert user: ${err}` }
    }
  }

  static async getRoutine(userId) {
    try {
      const routine = await users.findOne(
        { _id: ObjectId(userId) },
        { projection: { _id: 0, routine: 1 } }
      )
      if (routine === null) {
        return { error: `Invalid user_id` }
      }
      return routine
    } catch (err) {
      console.error(`Unable to get user: ${err}`)
      return { error: `Unable to get user: ${err}` }
    }
  }

  static async updateRoutine(userId, routine) {
    try {
      const updateResponse = await users.updateOne(
        { _id: ObjectId(userId) },
        { $set: { routine: routine } }
      )
      return { modified: updateResponse.modifiedCount }
    } catch (err) {
      console.error(`Unable to update routine: ${err}`)
      return { error: `Unable to update user: ${err}` }
    }
  }

}
