export default class UserUtils {
  static checkUsername(username) {
    if (username.length >= 50) {
      return { status: 0, error: "Username must be less than 50 characters" }
    }

    return { status: 1 }
  }
}
