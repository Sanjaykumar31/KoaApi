const { ObjectId } = require("mongodb");

module.exports = async (ctx, next) => {
  if (ObjectId.isValid(ctx.request.params.id)) {
    await next();
  } else {
    ctx.response.status = 422
    ctx.body = "Invalid ObjectId"
  }
};