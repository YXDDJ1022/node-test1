const errorTypes = require('../constants/error-types')

const errorHandle = (error, ctx) => {
  let status, message

  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400
      message = '用户名或密码不能为空'
      break
    case errorTypes.USER_ALREADY_EXISTS:
      status = 409
      message = '用户名已存在'
      break
    case errorTypes.USER_DOES_NOT_EXISTS:
      status = 400
      message = '用户名不存在'
      break
    case errorTypes.PASSWORD_IS_INCORRENT:
      status = 400
      message = '密码输入错误'
      break
    case errorTypes.UNAUTHORIZATION:
      status = 401
      message = 'token无效'
      break
    case errorTypes.UNPERMISSION:
      status = 401
      message = '没有权限'
      break
    default:
      status = 404
      message = '没有找到'
  }
  ctx.status = status
  ctx.body = message
}

module.exports = errorHandle
