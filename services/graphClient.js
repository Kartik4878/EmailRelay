const axios = require('axios')
const qs = require('qs')

async function getAccessToken({ clientId, clientSecret, tenantId }) {
  const url = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`
  const data = {
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
    scope: 'https://graph.microsoft.com/.default',
  }

  const response = await axios.post(url, qs.stringify(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })

  return response.data.access_token
}

async function sendMail(token, message) {
  const response = await axios.post(
    'https://graph.microsoft.com/v1.0/me/sendMail',
    message,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
  return response.data
}

async function readMessages(token) {
  const response = await axios.get('https://graph.microsoft.com/v1.0/me/messages', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.value
}

async function replyToMessage(token, messageId, body) {
  const url = `https://graph.microsoft.com/v1.0/me/messages/${messageId}/reply`
  await axios.post(url, {
    comment: body
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  return { status: 'Replied' }
}

async function forwardMessage(token, messageId, body, to) {
  const url = `https://graph.microsoft.com/v1.0/me/messages/${messageId}/forward`
  await axios.post(url, {
    comment: body,
    toRecipients: [
      {
        emailAddress: {
          address: to
        },
      },
    ],
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  return { status: 'Forwarded' }
}

module.exports = {
  getAccessToken,
  sendMail,
  readMessages,
  replyToMessage,
  forwardMessage
}