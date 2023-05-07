const fs = require('fs')
const userService = require('../service/user.service')
const fileService = require('../service/file.service')
const { AVATAR_PATH } = require('../constants/file-path')

class UserController {
  async create(ctx, next) {
    const { affectedRows } = await userService.create(ctx.request.body)
    if (affectedRows === 1) {
      ctx.body = '用户创建成功'
    } else {
      ctx.body = '用户创建失败'
    }
  }

  async avatarInfo(ctx, next) {
    const [avatarInfo] = await fileService.getAvatarByUserId(
      ctx.request.params.userId
    )
    ctx.response.set('Content-Type', avatarInfo.mimetype)
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)
  }
}

module.exports = new UserController(AVATAR_PATH)
