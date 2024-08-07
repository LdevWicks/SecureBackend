const express = require('express');
const router = express.Router();
const axios = require('axios'); // Add axios for making HTTP requests

// Define the base URL for the compliance API
const complianceApiUrl = 'http://localhost:3000/api/compliance/'; // Adjust if your base URL is different

// GET endpoint: Fetch compliance metrics
router.get('/', async (req, res) => {
    try {
        // Fetch compliance data from the /api/compliance endpoint
        const response = await axios.get(complianceApiUrl);
        const complianceData = response.data;

        // Ensure data is an array
        if (!Array.isArray(complianceData)) {
            throw new Error('Invalid data format');
        }

        // Calculate metrics
        const totalItems = complianceData.length;
        const completedItems = complianceData.filter(item => item.status === 'Completed').length;
        const nonCompliantItems = totalItems - completedItems; // Items that are not 'Completed'

        // Calculate compliance rate as a percentage
        const complianceRate = totalItems > 0 ? ((completedItems / totalItems) * 100).toFixed(2) : 0;

        const metrics = {
            complianceRate: parseFloat(complianceRate), // Convert to float for precision
            nonCompliantItems
        };

        res.json(metrics);
    } catch (error) {
        console.error('Error fetching compliance metrics:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;


