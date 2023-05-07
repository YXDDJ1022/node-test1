const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/config')

class AuthController {
  async login(ctx, next) {
    const { id, name } = ctx.user
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24 * 30, // 单位秒 当前秒数是1个月时间
      algorithm: 'RS256',
    })
    ctx.body = {
      id,
      name,
      token,
    }
  }
}

module.exports = new AuthController()
