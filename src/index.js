const express = require('express');
const admin = require('./firebase.config');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// API endpoint to get pipeline status
app.get('/api/pipeline-status', async (req, res) => {
  try {
    const snapshot = await admin.firestore().collection('pipeline-status').get();
    const status = snapshot.docs.map(doc => doc.data());
    res.status(200).json(status);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// API endpoint to update pipeline status
app.post('/api/pipeline-status', async (req, res) => {
  try {
    const { status } = req.body;
    await admin.firestore().collection('pipeline-status').add(status);
    res.status(200).send('Status updated successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
