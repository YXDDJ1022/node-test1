const connections = require('../app/database')

class CommentService {
  async create(momentId, content, userId) {
    const statement =
      'INSERT INTO `comment` (moment_id, content, users_id) VALUES (?, ?, ?);'
    const [results] = await connections.execute(statement, [
      momentId,
      content,
      userId
    ])
    return results
  }

  async reply(momentId, content, commentId, userId) {
    const statement =
      'INSERT INTO `comment` (moment_id, content, comment_id, users_id) VALUES (?, ?, ?, ?);'
    const [results] = await connections.execute(statement, [
      momentId,
      content,
      commentId,
      userId
    ])
    return results
  }

  async update(commentId, content) {
    const statement = 'UPDATE `comment` SET content = ? WHERE id = ?;'
    const [results] = await connections.execute(statement, [content, commentId])
    return results
  }

  async remove(commentId) {
    const statement = 'DELETE FROM `comment` WHERE id = ?;'
    const [results] = await connections.execute(statement, [commentId])
    return results
  }

  async getCommentsByMomentId(momentId) {
    const statement = 'SELECT * FROM `comment` WHERE moment_id = ?;'
    const [results] = await connections.execute(statement, [momentId])
    return results
  }
}

module.exports = new CommentService()
