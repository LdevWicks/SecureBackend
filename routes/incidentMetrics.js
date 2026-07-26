const express = require('express');
const router = express.Router();
const Incident = require('../models/Incidents');

// GET endpoint: Fetch incident metrics
router.get('/', async (req, res) => {
    try {
        const incidents = await Incident.find();

        // Calculate metrics based on the fetched data
        const totalIncidents = incidents.length;
        const criticalIncidents = incidents.filter(incident => incident.severity === 'Critical').length;
        const highSeverityIncidents = incidents.filter(incident => incident.severity === 'High').length;
        const mediumSeverityIncidents = incidents.filter(incident => incident.severity === 'Medium').length;
        const lowSeverityIncidents = incidents.filter(incident => incident.severity === 'Low').length;
        const resolvedIncidents = incidents.filter(incident => incident.status === 'Resolved').length;
        const openIncidents = incidents.filter(incident => ['Investigating', 'Ongoing'].includes(incident.status)).length;

        const metrics = {
            totalIncidents,
            criticalIncidents,
            highSeverityIncidents,
            resolvedIncidents,
            openIncidents,
            mediumSeverityIncidents,
            lowSeverityIncidents
        };

        res.json(metrics);
    } catch (error) {
        console.error('Error fetching incident metrics:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
