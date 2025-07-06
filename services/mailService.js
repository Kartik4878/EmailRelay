const graphClient = require('./graphClient')
const credentialStore = require('./credentialStore')

async function sendEmail(mailboxId, { to, subject, body }) {
  const credentials = await credentialStore.getCredentials(mailboxId)
  const token = await graphClient.getAccessToken(credentials)

  const message = {
    message: {
      subject,
      body: {
        contentType: 'Text',
        content: body,
      },
      toRecipients: [
        {
          emailAddress: {
            address: to,
          },
        },
      ],
    },
    saveToSentItems: 'true',
  }

  const result = await graphClient.sendMail(token, message)
  return result
}

async function readEmails(mailboxId) {
  const credentials = await credentialStore.getCredentials(mailboxId)
  const token = await graphClient.getAccessToken(credentials)
  const result = await graphClient.readMessages(token)
  return result
}

async function replyToEmail(mailboxId, { messageId, body }) {
  const credentials = await credentialStore.getCredentials(mailboxId)
  const token = await graphClient.getAccessToken(credentials)
  const result = await graphClient.replyToMessage(token, messageId, body)
  return result
}

async function forwardEmail(mailboxId, { messageId, body, to }) {
  const credentials = await credentialStore.getCredentials(mailboxId)
  const token = await graphClient.getAccessToken(credentials)
  const result = await graphClient.forwardMessage(token, messageId, body, to)
  return result
}

module.exports = {
  sendEmail,
  readEmails,
  replyToEmail,
  forwardEmail
}