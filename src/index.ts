const PORT = process.env.PORT

const Koa = require('koa')
const Router = require('koa-router')
const mount = require('koa-mount')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const MongoStore = require('koa-generic-session-mongo')
const accesslog = require('koa-accesslog')
const routes = require('./routes')
const cors = require('koa-cors')
const validate = require('koa-validate')
const mongoose = require('mongoose')
import errorHandler from'./utils/errorHandler'
import identity from './utils/identity'
const convert = require('koa-convert')


const start = async () => {
  try {
    mongoose.Promise = Promise
    await mongoose.connect(process.env.MONGODB)
  } catch (error) {
    console.log('failed to connect to mongoose')
  }


  console.log(process.env.MONGODB_USERNAME,process.env.MONGODB_PASSWORD)

  const app = new Koa()
  let router = new Router()
  const sessionStore = new  MongoStore({
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD,
    db: 'zine'
  })

  validate(app)
  routes.configRoutes(router)


  app.keys = [process.env.KEYS]

  app
    .use(errorHandler(app))
    .use(cors({ credentials: true }))
    .use(convert(session(app)))
    .use(bodyParser())
    .use(accesslog())
    .use(identity())
    .use(router.routes())
    .use(router.allowedMethods())

  app.on('error', (error, ctx) => console.log(error.message, error.stack, error.errors))

  app.listen(PORT, () => console.log(`listening on port ${PORT}`))
}

start()
  .catch(error => console.log('failed to start server: ', error))
