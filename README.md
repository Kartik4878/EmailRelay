#Email Relay API
A multi-tenant email relay service built with Fastify that provides REST API endpoints for email operations using Microsoft Graph API.

Features
Multi-tenant Support: Handle multiple mailboxes with separate credentials

Email Operations: Send, read, reply, and forward emails

Microsoft Graph Integration: Uses OAuth2 client credentials flow

Authentication: Header-based mailbox identification

Error Handling: Comprehensive error responses and logging

API Endpoints
POST /send - Send new email

GET /read - Read inbox messages

POST /reply - Reply to existing email

POST /forward - Forward email to recipients

Authentication
All requests require x-mailbox-id header to identify the mailbox credentials.

Tech Stack
Framework: Fastify

HTTP Client: Axios

Authentication: Microsoft Graph OAuth2

Architecture: Plugin-based with service layer


