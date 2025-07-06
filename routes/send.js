const mailService = require('../services/mailService')

module.exports = async function (fastify, opts) {
  fastify.post('/send', async (request, reply) => {
    const { to, subject, body } = request.body
    const mailboxId = request.mailboxId

    if (!to || !subject || !body) {
      return reply.status(400).send({ error: 'Missing required fields' })
    }

    try {
      const result = await mailService.sendEmail(mailboxId, { to, subject, body })
      return reply.send({ success: true, result })
    } catch (err) {
      request.log.error(err)
      return reply.status(500).send({ error: 'Failed to send email' })
    }
  })
}