const Fastify = require('fastify')
const sendRoute = require('./routes/send')
const readRoute = require('./routes/read')
const replyRoute = require('./routes/reply')
const forwardRoute = require('./routes/forward')
const authPlugin = require('./plugins/auth')

const app = Fastify({ logger: true })

app.register(authPlugin)
app.register(sendRoute)
app.register(readRoute)
app.register(replyRoute)
app.register(forwardRoute)

module.exports = app