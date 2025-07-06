// In real-world use AWS Secrets Manager or DynamoDB
const mailboxCredentials = {
  'mailbox1': {
    clientId: 'YOUR_CLIENT_ID_1',
    clientSecret: 'YOUR_SECRET_1',
    tenantId: 'YOUR_TENANT_ID_1',
  },
  'mailbox2': {
    clientId: 'YOUR_CLIENT_ID_2',
    clientSecret: 'YOUR_SECRET_2',
    tenantId: 'YOUR_TENANT_ID_2',
  },
}

async function getCredentials(mailboxId) {
  const creds = mailboxCredentials[mailboxId]
  if (!creds) throw new Error('Mailbox credentials not found')
  return creds
}

module.exports = {
  getCredentials
}