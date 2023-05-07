const config = require('./app/config')
const app = require('./app')
require('./app/database')

const server = app.listen(config.APP_PORT, config.APP_HOST, () => {
  const { address, port } = server.address()
  console.log('服务启动成功')
  console.log(`http://${address}:${port}`)
})
