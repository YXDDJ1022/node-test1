const path = require('path')
const Multer = require('@koa/multer')
const Jimp = require('jimp')
const { AVATAR_PATH, FILE_PATH } = require('../constants/file-path')

const avatarUpload = Multer({
  dest: AVATAR_PATH
})
const avatarHandler = avatarUpload.single('avatar')

const pictureUpload = Multer({
  dest: FILE_PATH
})
const pictureHandler = pictureUpload.array('picture', 9)

const pictureResize = async (ctx, next) => {
  const files = ctx.request.files
  for (let file of files) {
    console.log('---------- 临时检测，记得删除 Begin ----------')
    console.log(file)
    console.log('---------- 临时检测，记得删除 End ----------')
    const destPath = path.join(file.destination, file.filename)
    Jimp.read(file.path).then(image => {
      image.resize(1280, Jimp.AUTO).write(`${destPath}-large`)
      image.resize(640, Jimp.AUTO).write(`${destPath}-middle`)
      image.resize(320, Jimp.AUTO).write(`${destPath}-small`)
    })
  }
  await next()
}

module.exports = {
  avatarHandler,
  pictureHandler,
  pictureResize
}
