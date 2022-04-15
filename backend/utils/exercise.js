export default class ExerciseUtils {
  static categories = new Set([
    'cardio',
    'calisthenics',
    'weights'
  ])

  static exerciseSanitization(userId, name, category) {
    const exercise = {}
    const verification = (obj, param, arg, msg) => {
      if (arg == undefined) {
        obj.error = msg
        return
      }
      obj[param] = arg
    }

    verification(exercise, "user_id", userId, "Exercise must have an user id")
    verification(exercise, "name", name, "Exercise must have a name")
    verification(
      exercise,
      "category",
      category,
      "Exercise must have a category"
    )
    return exercise
  }

  static isCategoryOk(category) {
    return this.categories.has(category)
  }

}
