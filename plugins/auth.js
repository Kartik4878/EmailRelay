module.exports = async function (fastify, opts) {
  fastify.addHook('preHandler', async (request, reply) => {
    const mailboxId = request.headers['x-mailbox-id']
    if (!mailboxId) {
      reply.status(400).send({ error: 'Missing x-mailbox-id header' })
    }
    request.mailboxId = mailboxId
  })
}