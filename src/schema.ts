export const EmailPayload = {
  type: 'object',
  properties: {
    to: {
      type: 'string',
    },
    from: {
      type: 'string',
    },
    subject: {
      type: 'string',
    },
    text: {
      type: 'string',
    },
    html: {
      type: 'string',
    },
    cc: {
      type: 'string',
    },
    bcc: {
      type: 'string',
    },
  },
  required: ['to', 'from', 'subject', 'text', 'html'],
};
