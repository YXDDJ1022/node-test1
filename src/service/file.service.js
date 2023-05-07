const connections = require('../app/database')

class FileService {
  async createAvatar(filename, mimetype, size, userId) {
    const statement =
      'INSERT INTO avatar (filename, mimetype, size, users_id) VALUES (?, ?, ?, ?);'
    const [results] = await connections.execute(statement, [
      filename,
      mimetype,
      size,
      userId
    ])
    return results
  }

  async getAvatarByUserId(userId) {
    const statement = 'SELECT * FROM avatar WHERE users_id = ?;'
    const [results] = await connections.execute(statement, [userId])
    return results
  }

  async createFile(filename, mimetype, size, userId, momentId) {
    const statement =
      'INSERT INTO file (filename, mimetype, size, users_id, moment_id) VALUES (?, ?, ?, ?, ?);'
    const [results] = await connections.execute(statement, [
      filename,
      mimetype,
      size,
      userId,
      momentId
    ])
    return results
  }
}

module.exports = new FileService()
