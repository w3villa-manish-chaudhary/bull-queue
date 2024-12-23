const emailQueue = require('./emailQueue');

// Worker to process email jobs
emailQueue.process(async (job) => {
  const { email, subject, body } = job.data;

  console.log(`Processing job: Sending email to ${email}`);
  
  // Simulate email sending delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  console.log(`Email sent to ${email} with subject: "${subject}"`);
});

// Log job completion
emailQueue.on('completed', (job) => {
  console.log(`Job ${job.id} completed successfully`);
});

// Log job failure
emailQueue.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed with error: ${err.message}`);
});
