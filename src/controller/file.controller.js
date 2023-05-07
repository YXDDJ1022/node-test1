const fileService = require('../service/file.service')
const userService = require('../service/user.service')
const { AVATAR_PATH } = require('../constants/file-path')
const { APP_HOST, APP_PORT } = require('../app/config')

class FileController {
  async saveAvatarInfo(ctx, next) {
    const { filename, mimetype, size } = ctx.request.file
    const userId = ctx.user.id
    await fileService.createAvatar(filename, mimetype, size, userId)
    const avatarUrl = `http://${APP_HOST}:${APP_PORT}/users/${userId}/avatar`
    await userService.updateAvatarUrlById(avatarUrl, userId)
    ctx.body = '头像上传成功'
  }
  async savePictureInfo(ctx, next) {
    const files = ctx.request.files
    const userId = ctx.user.id
    const momentId = ctx.request.query.momentId
    for (let file of files) {
      const { filename, mimetype, size } = file
      await fileService.createFile(filename, mimetype, size, userId, momentId)
    }
    ctx.body = '配图上传成功'
  }
}

module.exports = new FileController()
