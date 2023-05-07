const labelService = require('../service/label.service')

class LabelController {
  async create(ctx, next) {
    const result = await labelService.create(ctx.request.body.name)
    ctx.body = result
  }

  async list(ctx, next) {
    const { offset, pageSize } = ctx.request.query
    const result = await labelService.list(offset, pageSize)
    ctx.body = result
  }
}

module.exports = new LabelController()
