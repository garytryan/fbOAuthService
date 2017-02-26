const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

const pause = count => new Promise(resolve => { setTimeout(resolve, count) })

router.get('/', async ctx => {
  await pause(2000)
  ctx.body = 'hello'
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000, () => console.log('listening on port 3000'))
