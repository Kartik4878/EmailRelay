const mailService = require('../services/mailService')

module.exports = async function (fastify, opts) {
  fastify.post('/reply', async (request, reply) => {
    const { messageId, body } = request.body
    const mailboxId = request.mailboxId

    if (!messageId || !body) {
      return reply.status(400).send({ error: 'Missing required fields' })
    }

    try {
      const result = await mailService.replyToEmail(mailboxId, { messageId, body })
      return reply.send({ success: true, result })
    } catch (err) {
      request.log.error(err)
      return reply.status(500).send({ error: 'Failed to reply to email' })
    }
  })
}