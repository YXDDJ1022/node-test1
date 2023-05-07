const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const errorHandle = require('./error-handle')
const registerRoutes = require('../router')

const app = new Koa()

app.use(bodyParser())
registerRoutes(app)
app.on('error', errorHandle)

module.exports = app
