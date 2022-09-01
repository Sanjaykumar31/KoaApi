function middleware(validator) {
  return async (ctx, next) => {
    try {
      await validator.validateAsync(ctx.request.body)
      next()
    }
    catch (err) {
      ctx.response.status = 422
      ctx.body = err.message
    }
  }
}

module.exports = middleware