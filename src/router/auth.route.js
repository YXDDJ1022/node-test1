const Router = require('@koa/router')
const { verifyLogin } = require('../middleware/auth.middleware')
const { login } = require('../controller/auth.controller')

const authRouter = new Router()

authRouter.post('/login', verifyLogin, login)

module.exports = authRouter
