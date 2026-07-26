const express = require('express');
const router = express.Router();
const Compliance = require('../models/compliance');

// GET endpoint: Fetch compliance metrics
router.get('/', async (req, res) => {
    try {
        const complianceData = await Compliance.find();

        // Calculate metrics
        const totalItems = complianceData.length;
        const completedItems = complianceData.filter(item => item.status === 'Completed').length;
        const inProgressItems = complianceData.filter(item => item.status === 'In Progress').length;
        const pendingItems = complianceData.filter(item => item.status === 'Pending').length;
        const nonCompliantItems = totalItems - completedItems; // Items that are not 'Completed'

        // Calculate compliance rate as a percentage
        const complianceRate = totalItems > 0 ? ((completedItems / totalItems) * 100).toFixed(2) : 0;

        const metrics = {
            complianceRate: parseFloat(complianceRate), // Convert to float for precision
            nonCompliantItems,
            inProgressItems,
            pendingItems,
            completedItems
        };

        res.json(metrics);
    } catch (error) {
        console.error('Error fetching compliance metrics:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;


