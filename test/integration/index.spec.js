const chai = require('chai')
const Redis = require('ioredis')
const config = require(`${process.cwd()}/lib/config`)

const redis = new Redis({ host: config.redis.host})

chai.use(require('chai-http'))
const expect = chai.expect

const app = require(`${process.cwd()}/lib/index`)
const request = chai.request(app.listen())

describe('/users', () => {
  beforeEach(() => {
    return redis.flushall()
  })

  it('should be able to get a user', () => {
    return redis.set('someUsername', 23)
      .then(() => {
        return request.get('/users/someUsername')
      })
      .then(res => {
        const body = res.body
        expect(body).to.deep.equal({
          data: {
            username: 'someUsername',
            age: 23
          }
        })
      })
  })
})