const express = require('express');
const router = express.Router();
const axios = require('axios'); // Add axios for making HTTP requests

// Define the base URL for the vulnerabilities API
const vulnerabilitiesApiUrl = 'http://localhost:3000/api/vulnerabilities/'; // Adjust if your base URL is different

// GET endpoint: Fetch vulnerability metrics
router.get('/', async (req, res) => {
    try {
        // Fetch vulnerability data from the /api/vulnerabilities endpoint
        const response = await axios.get(vulnerabilitiesApiUrl);
        const vulnerabilities = response.data;

        // Calculate metrics based on the fetched data
        const totalVulnerabilities = vulnerabilities.length;
        const criticalVulnerabilities = vulnerabilities.filter(vuln => vuln.severity === 'Critical').length;
        const highVulnerabilities = vulnerabilities.filter(vuln => vuln.severity === 'High').length;

        const metrics = {
            total: totalVulnerabilities,
            critical: criticalVulnerabilities,
            high: highVulnerabilities
        };

        res.json(metrics);
    } catch (error) {
        console.error('Error fetching vulnerability metrics:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
