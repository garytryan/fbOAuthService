const PORT = process.env.PORT

const Koa = require('koa')
const Router = require('koa-router')
const mount = require('koa-mount')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const accesslog = require('koa-accesslog')
const grantConfig = require('./config/grant.config')
const routes = require('./routes')
const cors = require('koa-cors')
const validate = require('koa-validate')
const mongoose = require('mongoose')
import errorHandler from'./utils/errorHandler/index'

const app = new Koa()
let router = new Router()
const Grant = require('grant-koa')
const grant = new Grant(grantConfig)

validate(app)
routes.configRoutes(router)


app.keys = ['grant']

app
  .use(errorHandler(app))
  .use(cors())
  .use(session(app))
  .use(bodyParser())
  .use(accesslog())
  .use(mount(grant))
  .use(router.routes())
  .use(router.allowedMethods())

app.on('error', (error, ctx) => console.log(error.message, error.errors))

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB)
    console.log('connect to mongodb')

    app.listen(PORT, () => console.log(`listening on port ${PORT}`))
  } catch (error) {
    console.log('failed to connect to start', error)
  }
}

start()
