const express = require('express');
const router = express.Router();
const Vulnerability = require('../models/Vulnerability');

// GET endpoint: Fetch vulnerability metrics
router.get('/', async (req, res) => {
    try {
        const vulnerabilities = await Vulnerability.find();

        // Calculate metrics based on the fetched data
        const totalVulnerabilities = vulnerabilities.length;
        const criticalVulnerabilities = vulnerabilities.filter(vuln => vuln.severity === 'Critical').length;
        const highVulnerabilities = vulnerabilities.filter(vuln => vuln.severity === 'High').length;
        const mediumVulnerabilities = vulnerabilities.filter(vuln => vuln.severity === 'Medium').length;
        const lowVulnerabilities = vulnerabilities.filter(vuln => vuln.severity === 'Low').length;

        const metrics = {
            total: totalVulnerabilities,
            critical: criticalVulnerabilities,
            high: highVulnerabilities,
            medium: mediumVulnerabilities,
            low:lowVulnerabilities
        };

        res.json(metrics);
    } catch (error) {
        console.error('Error fetching vulnerability metrics:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
