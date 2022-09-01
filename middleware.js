function middleware(schema) {
  return async (ctx, next) => {
    try {
      await schema.validateAsync(ctx.request.body)
      next()
    }
    catch (err) {
      ctx.response.statu = 422
      ctx.body = err.message
    }
  }
}

module.exports = middleware