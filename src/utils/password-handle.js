const crypto = require('crypto')

const md5password = password => {
  const md5 = crypto.createHash('md5')
  const handledPassword = md5.update(password).digest('hex')
  return handledPassword
}

module.exports = md5password