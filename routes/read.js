const mailService = require('../services/mailService')

module.exports = async function (fastify, opts) {
  fastify.get('/read', async (request, reply) => {
    const mailboxId = request.mailboxId

    try {
      const messages = await mailService.readEmails(mailboxId)
      return reply.send({ success: true, messages })
    } catch (err) {
      request.log.error(err)
      return reply.status(500).send({ error: 'Failed to read emails' })
    }
  })
}