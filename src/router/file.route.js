const Router = require('@koa/router')
const { avatarHandler, pictureHandler, pictureResize } = require('../middleware/file.middleware')
const { verifyAuth } = require('../middleware/auth.middleware')
const fileController = require('../controller/file.controller')

const fileRouter = new Router({ prefix: '/upload' })

fileRouter.post(
  '/avatar',
  verifyAuth,
  avatarHandler,
  fileController.saveAvatarInfo
)
fileRouter.post(
  '/picture',
  verifyAuth,
  pictureHandler,
  pictureResize,
  fileController.savePictureInfo
)

module.exports = fileRouter
