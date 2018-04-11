const nconf = require('nconf').env({
  separator: '__',
  lowerCase: true
})

nconf.defaults({
  port: 3000,
  redis: {
    host: 'loclhost'
  }
})

module.exports = {
  port: nconf.get('port'),
  redis: nconf.get('redis')
}