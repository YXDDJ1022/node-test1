const fs = require('fs')

const registerRoutes = (app) => {
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === 'index.js') return
    const route = require(`./${file}`)
    app.use(route.routes())
    app.use(route.allowedMethods())
  })
}

module.exports = registerRoutes
