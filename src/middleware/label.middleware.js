const labelService = require('../service/label.service')

const verifyLabelExists = async (ctx, next) => {
  const labels = []
  for (let item of ctx.request.body.labels) {
    const label = await labelService.getLabelByName(item)
    if (!label) {
      const result = await labelService.create(item)
      labels.push({ id: result.insertId, name: item })
    } else {
      labels.push(label)
    }
  }
  ctx.labels = labels
  await next()
}

module.exports = {
  verifyLabelExists
}
