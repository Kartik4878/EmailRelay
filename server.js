const app = require('./app')

const start = async () => {
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' })
    console.log('Server running on http://localhost:3000')
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()