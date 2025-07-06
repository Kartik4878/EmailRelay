const mailService = require('../services/mailService')

module.exports = async function (fastify, opts) {
  fastify.post('/forward', async (request, reply) => {
    const { messageId, body, to } = request.body
    const mailboxId = request.mailboxId

    if (!messageId || !body || !to) {
      return reply.status(400).send({ error: 'Missing required fields' })
    }

    try {
      const result = await mailService.forwardEmail(mailboxId, { messageId, body, to })
      return reply.send({ success: true, result })
    } catch (err) {
      request.log.error(err)
      return reply.status(500).send({ error: 'Failed to forward email' })
    }
  })
}