const connections = require('../app/database')

class MomentService {
  async getMomentById(id) {
    const statement = `
      SELECT
        m.id AS id,
        m.content AS content,
        m.createAt AS createTime,
        m.updateAt AS updateTime,
        JSON_OBJECT('id', u.id, 'userName', u.name, 'avatarUrl', u.avatar_url) AS user,
        IF (COUNT(la.id), JSON_ARRAYAGG(JSON_OBJECT('id', la.id, 'name', la.name)), NULL) AS label,
        (SELECT IF (COUNT(c.id), JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'user', JSON_OBJECT('id', cu.id, 'name', cu.name, 'avatarUrl', cu.avatar_url))), NULL) FROM \`comment\` AS c LEFT JOIN users AS cu ON cu.id = c.users_id WHERE m.id = c.moment_id) AS comments,
        (SELECT JSON_ARRAYAGG(CONCAT('http://127.0.0.1:9090/moment/images/', file.filename)) FROM file WHERE m.id = file.moment_id) AS images
      FROM
        moment AS m
        LEFT JOIN users AS u ON m.users_id = u.id
        LEFT JOIN \`moment_label\` AS ml ON ml.moment_id = m.id
				LEFT JOIN label As la ON la.id = ml.label_id
        WHERE m.id = ?
        GROUP BY m.id;
    `
    try {
      const [results] = await connections.execute(statement, [id])
      return results
    } catch (e) {
      console.log(e)
    }
  }

  async getMomentList(offset, pageSize) {
    const statement = `
      SELECT
        m.id,
        m.content,
        m.createAt,
        m.updateAt,
        JSON_OBJECT('id', u.id, 'userName', u.name, 'avatarUrl', u.avatar_url) AS \`user\`,
        (SELECT COUNT(*) FROM \`comment\` AS c WHERE c.moment_id = m.id) AS commentCount,
        (SELECT COUNT(*) FROM moment_label AS ml WHERE ml.moment_id = m.id) AS labelCount,
        (SELECT JSON_ARRAYAGG(CONCAT('http://127.0.0.1:9090/moment/images/', file.filename)) FROM file WHERE m.id = file.moment_id) AS images
      FROM
        moment AS m
        LEFT JOIN users AS u ON m.users_id = u.id 
      LIMIT ?, ?;
    `
    const [results] = await connections.execute(statement, [offset, pageSize])
    return results
  }

  async create(userId, content) {
    const statement = 'INSERT INTO moment (content, users_id) values (?, ?);'
    const [results] = await connections.execute(statement, [content, userId])
    return results
  }

  async update(content, momentId) {
    const statement = 'UPDATE moment SET content = ? WHERE id = ?;'
    const [results] = await connections.execute(statement, [content, momentId])
    return results
  }

  async remove(momentId) {
    const statement = 'DELETE FROM moment WHERE id = ?'
    const [results] = await connections.execute(statement, [momentId])
    return results
  }

  async hasLabel(momentId, labelId) {
    const statement =
      'SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;'
    const [results] = await connections.execute(statement, [momentId, labelId])
    return results.length === 1
  }

  async addLabel(momentId, labelId) {
    const statement = 'INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);'
    const [results] = await connections.execute(statement, [momentId, labelId])
    return results
  }

  async getFileByfilename(filename) {
    const statement = 'SELECT * FROM file WHERE filename = ?;'
    const [results] = await connections.execute(statement, [filename])
    return results
  }
}

module.exports = new MomentService()
