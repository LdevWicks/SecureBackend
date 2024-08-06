const express = require('express');
const router = express.Router();

const Compliance = require('./models/Compliance');
const Incident = require('./models/Incident');
const Vulnerability = require('./models/Vulnerability');

// Compliance Routes
router.get('/compliance', async (req, res) => {
  const compliances = await Compliance.find();
  res.json(compliances);
});

router.post('/compliance', async (req, res) => {
  const compliance = new Compliance(req.body);
  await compliance.save();
  res.json(compliance);
});

// Incident Routes
router.get('/incidents', async (req, res) => {
  const incidents = await Incident.find();
  res.json(incidents);
});

router.post('/incidents', async (req, res) => {
  const incident = new Incident(req.body);
  await incident.save();
  res.json(incident);
});

// Vulnerability Routes
router.get('/vulnerabilities', async (req, res) => {
  const vulnerabilities = await Vulnerability.find();
  res.json(vulnerabilities);
});

router.post('/vulnerabilities', async (req, res) => {
  const vulnerability = new Vulnerability(req.body);
  await vulnerability.save();
  res.json(vulnerability);
});

module.exports = router;
