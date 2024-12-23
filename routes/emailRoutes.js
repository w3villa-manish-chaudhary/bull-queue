const express = require('express');
const emailQueue = require('../emailQueue');
const router = express.Router();

// Route to add a job to the queue
router.post('/send-email', async (req, res) => {
  const { email, subject, body } = req.body;

  if (!email || !subject || !body) {
    return res.status(400).send({ error: 'Email, subject, and body are required' });
  }

  // Add job to the queue
  const job = await emailQueue.add(
    { email, subject, body }, 
    { removeOnComplete: true } // Automatically remove the job on completion
  );

  res.status(200).send({ message: 'Job added to the queue', jobId: job.id });
});

// Route to get job status
router.get('/job-status/:id', async (req, res) => {
  const jobId = req.params.id;

  const job = await emailQueue.getJob(jobId);

  if (!job) {
    return res.status(404).send({ error: 'Job not found' });
  }

  const status = await job.getState();
  res.status(200).send({ jobId, status });
});

module.exports = router;
