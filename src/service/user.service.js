const connections = require('../app/database')

class UserService {
  async create({ name, password }) {
    const statement = 'INSERT INTO users (name, password) VALUES (?, ?);'
    const [results] = await connections.execute(statement, [name, password])
    return results
  }

  async getUserByName(name) {
    const statement = 'SELECT * FROM users WHERE name = ?;'
    const [results] = await connections.execute(statement, [name])
    return results
  }

  async updateAvatarUrlById(avatarUrl, userId) {
    const statement = 'UPDATE users SET avatar_url = ? WHERE id = ?;'
    const [results] = await connections.execute(statement, [avatarUrl, userId])
    return results
  }
}

module.exports = new UserService()
