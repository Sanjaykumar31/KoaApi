const router = require('koa-router')()
const bodyparser = require('koa-bodyparser')
const studentCatalog = require('../model/studentCatalog')
const validator = require('../validator')
const middleware = require('../middleware')
const _ = require('lodash')
const checkId = require('../checkId')

router.use(bodyparser())
router.get('/student', async (ctx) => {
  try {
    const student = await studentCatalog.find();
    ctx.response.status = 200;
    ctx.body = student;
  } catch (error) {
    ctx.response.status = 500;
    ctx.body = error.message;
  }
})

router.get('/student/:id', checkId, getstudent, async (ctx) => {
  try {
    const result = await studentCatalog.findById(ctx.request.params.id);
    ctx.response.status = 200;
    ctx.body = result
  } catch (error) {
    ctx.response.status = 500;
    ctx.body = error.message;
  }
})

router.post('/student', middleware(validator), async (ctx) => {
  const student = new studentCatalog(ctx.request.body)
  try {
    const result = await student.save();
    ctx.response.status = 201;
    ctx.body = await result;
  } catch (error) {
    ctx.response.status = 422;
    ctx.body = error.message;
  }
})


router.put('/student/:id', checkId, getstudent, async (ctx) => {
  try {
    const result = await studentCatalog.findByIdAndUpdate(ctx.request.params.id, ctx.request.body, { new: true })
    ctx.response.status = 200
    ctx.body = await result
  }
  catch (err) {
    ctx.response.status = 500
    ctx.body = err.message
  }
})

router.delete('/student/:id', checkId, getstudent, async (ctx) => {
  try {
    await studentCatalog.findByIdAndDelete(ctx.request.params.id);
    ctx.response.status = 200;
    ctx.body = "Student removed";
  } catch (error) {
    ctx.response.status = 500;
    ctx.body = error.message;
  }
})

async function getstudent(ctx, next) {
  let student
  try {
    student = await studentCatalog.findById(ctx.request.params.id)
    if (!_.isEmpty(student)) {
      await next()
    } else {
      ctx.response.status = 201
      ctx.body = "Cannot Find Student"
    }

  }
  catch (err) {
    ctx.response.status = 500
    ctx.body = err.messaage
  }

}

module.exports = router