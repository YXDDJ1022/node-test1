const connections = require('../app/database')

class AuthService {
  async checkResource(tableName, resourceId, currentUserId) {
    // 思路1: 先找到该条数据的创始人的ID 再与当前登录的这个账号的ID做比对
    const statement = `SELECT users_id AS founderId FROM ${tableName} WHERE id = ?;`
    const [results] = await connections.execute(statement, [resourceId])
    return results[0].founderId === currentUserId

    // 思路2: 在查找这条数据时多增加一个过滤条件 假设认为这条记录的创始人就是当前登录的这个人账号的ID，如果能查询到记录数据就证明假设成立，当前登录的这个人有权限操作否则没有
  }
}

module.exports = new AuthService()
