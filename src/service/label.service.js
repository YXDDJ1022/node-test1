const connections = require('../app/database')

class LabelService {
  async create(name) {
    const statement = 'INSERT INTO `label` SET name = ?;'
    const [results] = await connections.execute(statement, [name])
    return results
  }

  async getLabelByName(name) {
    const statement = 'SELECT * FROM label WHERE name = ?;'
    const [results] = await connections.execute(statement, [name])
    return results[0]
  }

  async list(offset, pageSize) {
    const statement = 'SELECT * FROM label limit ?, ?;'
    const [results] = await connections.execute(statement, [offset, pageSize])
    return results
  }
}

module.exports = new LabelService()
