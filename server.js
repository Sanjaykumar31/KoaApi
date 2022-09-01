const koa = require('koa')
const app = new koa()
const cors = require('koa2-cors')
const router = require("./routes/studentrouter")
require('./dbconfig')
const PORT = process.env.PORT || 4000


app.use(cors())
app.use(router.routes(), router.allowedMethods());
// app.use((ctx) => {
//   ctx.body = "welcome To My Api"
// })

app.listen(PORT, () => console.log(`${PORT} Server started`));

