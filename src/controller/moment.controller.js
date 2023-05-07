const fs = require('fs')
const momentService = require('../service/moment.service')
const { FILE_PATH } = require('../constants/file-path')

class MomentController {
  async detail(ctx, next) {
    const momentId = ctx.params.momentId
    const result = await momentService.getMomentById(momentId)
    ctx.body = result
  }

  async list(ctx, next) {
    const { offset, pageSize } = ctx.request.query
    const result = await momentService.getMomentList(offset, pageSize)
    ctx.body = result
  }

  async create(ctx, next) {
    const result = await momentService.create(
      ctx.user.id,
      ctx.request.body.content
    )
    ctx.body = result
  }

  async update(ctx, next) {
    const result = await momentService.update(
      ctx.request.body.content,
      ctx.request.params.momentId
    )
    ctx.body = result
  }

  async remove(ctx, next) {
    const result = await momentService.remove(ctx.request.params.momentId)
    ctx.body = result
  }

  async addLabel(ctx, next) {
    const labels = ctx.labels
    const momentId = ctx.request.params.momentId

    for (let item of labels) {
      const isHas = await momentService.hasLabel(momentId, item.id)
      if (!isHas) {
        await momentService.addLabel(momentId, item.id)
      }
    }
    ctx.body = '标签添加成功'
  }

  async fileInfo(ctx, next) {
    const types = ['small', 'middle', 'large']
    let filename = ctx.request.params.filename
    const type = ctx.request.query.type
    const [file] = await momentService.getFileByfilename(filename)
    ctx.response.set('Content-Type', file.mimetype)
    if (type && types.some(item => item === type)) {
      filename += `-${type}`
    }
    ctx.body = fs.createReadStream(`${FILE_PATH}/${filename}`)
  }
}

module.exports = new MomentController()
