const userService = require('../service/user.service')
const md5password = require('../utils/password-handle')
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_ALREADY_EXISTS,
} = require('../constants/error-types')

const verifyUser = async (ctx, next) => {
  const { name, password } = ctx.request.body
  if (!name || !password) {
    // 判断用户名或密码是否为空
    return ctx.app.emit('error', new Error(NAME_OR_PASSWORD_IS_REQUIRED), ctx)
  }

  // 判断用户名是否已经存在
  const result = await userService.getUserByName(name)
  if (result.length) {
    return ctx.app.emit('error', new Error(USER_ALREADY_EXISTS), ctx)
  }
  await next()
}

const handlePassword = async (ctx, next) => {
  let { password } = ctx.request.body
  ctx.request.body.password = md5password(password)
  await next()
}

module.exports = {
  verifyUser,
  handlePassword
}
