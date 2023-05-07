const jwt = require('jsonwebtoken')

const userService = require('../service/user.service')
const authService = require('../service/auth.service')
const md5password = require('../utils/password-handle')
const { PUBLIC_KEY } = require('../app/config')
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_DOES_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
  UNAUTHORIZATION,
  UNPERMISSION
} = require('../constants/error-types')
/**
 * @description 登录前的各种校验
 * @param {  }
 * @return {  }
 */
const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body

  if (!name || !password) {
    // 判断用户名或密码是否为空
    return ctx.app.emit('error', new Error(NAME_OR_PASSWORD_IS_REQUIRED), ctx)
  }

  // 判断用户名是否不存在
  const result = await userService.getUserByName(name)
  const user = result[0]
  if (!user) {
    return ctx.app.emit('error', new Error(USER_DOES_NOT_EXISTS), ctx)
  }

  // 判断密码是否输入正确
  if (md5password(password) !== user.password) {
    return ctx.app.emit('error', new Error(PASSWORD_IS_INCORRENT), ctx)
  }

  ctx.user = user

  next()
}
/**
 * @description 是否登录
 * @param {  }
 * @return {  }
 */
const verifyAuth = async (ctx, next) => {
  const authorization = ctx.request.headers.authorization
  if (!authorization) {
    return ctx.app.emit('error', new Error(UNAUTHORIZATION), ctx)
  }
  const token = authorization.replace('Bearer ', '')

  try {
    const userInfo = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    ctx.user = userInfo
    await next()
  } catch (error) {
    console.log(error)
    return ctx.app.emit('error', new Error(UNAUTHORIZATION), ctx)
  }
}

const verifyPermission = tableName => {
  return async (ctx, next) => {
    const isPermission = await authService.checkResource(
      tableName,
      Object.values(ctx.request.params)[0],
      ctx.user.id
    )
    if (!isPermission) {
      return ctx.app.emit('error', new Error(UNPERMISSION), ctx)
    } else {
      await next()
    }
  }
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}
