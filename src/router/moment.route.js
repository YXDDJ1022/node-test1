const Router = require('@koa/router')
const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware')
const { verifyLabelExists } = require('../middleware/label.middleware')
const momentController = require('../controller/moment.controller')

const momentRouter = new Router({ prefix: '/moment' })

momentRouter.get('/:momentId', momentController.detail)

momentRouter.get('/', momentController.list)

momentRouter.post('/', verifyAuth, momentController.create)

momentRouter.patch(
  '/:momentId',
  verifyAuth,
  verifyPermission('moment'),
  momentController.update
)

momentRouter.delete(
  '/:momentId',
  verifyAuth,
  verifyPermission('moment'),
  momentController.remove
)

momentRouter.post(
  '/:momentId/label',
  verifyAuth,
  verifyPermission('moment'),
  verifyLabelExists,
  momentController.addLabel
)

momentRouter.get('/images/:filename', momentController.fileInfo)

module.exports = momentRouter
