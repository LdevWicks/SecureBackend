const express = require('express');
const router = express.Router();
const axios = require('axios'); // Add axios for making HTTP requests

// Define the base URL for the incidents API
const incidentsApiUrl = 'http://localhost:3000/api/incidents/'; // Adjust if your base URL is different

// GET endpoint: Fetch incident metrics
router.get('/', async (req, res) => {
    try {
        // Fetch incident data from the /api/incidents endpoint
        const response = await axios.get(incidentsApiUrl);
        const incidents = response.data;

        // Calculate metrics based on the fetched data
        const totalIncidents = incidents.length;
        const criticalIncidents = incidents.filter(incident => incident.severity === 'Critical').length;
        const highSeverityIncidents = incidents.filter(incident => incident.severity === 'High').length;
        const resolvedIncidents = incidents.filter(incident => incident.status === 'Resolved').length;
        const openIncidents = incidents.filter(incident => ['Investigating', 'Ongoing'].includes(incident.status)).length;

        const metrics = {
            totalIncidents,
            criticalIncidents,
            highSeverityIncidents,
            resolvedIncidents,
            openIncidents
        };

        res.json(metrics);
    } catch (error) {
        console.error('Error fetching incident metrics:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
