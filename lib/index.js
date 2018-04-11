const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const { port, redis: { host: redisHost } } = require('./config')
const Redis = require('ioredis')
const app = new Koa()
const redis = new Redis({
  host: redisHost
})

const index = async (ctx, next) => {
  ctx.body = {
    data: 'someData'
  }
  await next()
}

const addUser = async (ctx, next) => {
  const { username, age } = ctx.request.body

  redis.set(username, age)
  ctx.body = {
    data: { username, age }
  }
}

const getUser = async (ctx, next) => {
  const { username } = ctx.params

  const age = await redis.get(username)

  ctx.body = {
    data: { username, age: parseInt(age) }
  }
}

router.get('/', index)
router.post('/users', addUser)
router.get('/users/:username', getUser)
app
  .use(bodyParser())
  .use(router.routes())

app.listen(port)

module.exports = app
