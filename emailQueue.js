const Queue = require('bull');

// Create a queue named 'emailQueue'
const emailQueue = new Queue('emailQueue', {
  redis: { host: '127.0.0.1', port: 6379 },
});

// Export the queue
module.exports = emailQueue;
