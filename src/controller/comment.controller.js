const commentService = require('../service/comment.service')

class CommentController {
  async create(ctx, next) {
    const { momentId, content } = ctx.request.body
    const result = await commentService.create(momentId, content, ctx.user.id)
    ctx.body = result
  }

  async reply(ctx, next) {
    const { momentId, content } = ctx.request.body
    const result = await commentService.reply(
      momentId,
      content,
      ctx.request.params.commentId,
      ctx.user.id
    )
    ctx.body = result
  }

  async update(ctx, next) {
    const result = await commentService.update(
      ctx.request.params.commentId,
      ctx.request.body.content
    )
    ctx.body = result
  }

  async remove(ctx, next) {
    const result = await commentService.remove(ctx.request.params.commentId)
    ctx.body = result
  }

  async list(ctx, next) {
    const result = await commentService.getCommentsByMomentId(ctx.request.query.momentId)
    ctx.body = result
  }
}

module.exports = new CommentController()
