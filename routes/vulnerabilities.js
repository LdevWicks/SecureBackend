
const express = require('express');
const router = express.Router();

let vulnerabilityData = [ // In-memory storage for compliance data
    { id: 'VULN-001', severity: 'Critical', description: 'SQL Injection', status: 'Open' },
    { id: 'VULN-002', severity: 'High', description: 'Cross-Site Scripting', status: 'In Progress' },
    { id: 'VULN-003', severity: 'Medium', description: 'Sensitive Data Exposure', status: 'Resolved' },
    { id: 'VULN-004', severity: 'Low', description: 'Security Misconfiguration', status: 'Resolved' }
];

// GET endpoint: Fetch all compliance items
router.get('/', (req, res) => {
    console.log('Fetched vulnerability data:', vulnerabilityData);
    res.json(vulnerabilityData); 
});

// POST endpoint: Add new compliance items
router.post('/', (req, res) => {
    try {
        const requestData = req.body;

        // Ensure requestData is an array
        if (!Array.isArray(requestData)) {
            return res.status(400).json({ message: 'Invalid data format. Expected an array of vulnerability items.' });
        }

        vulnerabilityData = [...vulnerabilityData, ...requestData];

        res.status(201).json({
            message: 'Data added successfully',
            data: requestData,
        });
    } catch (error) {
        console.error('Error processing data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// PUT endpoint: Update an existing compliance item by ID
router.put('/:id', (req, res) => {
    try {
        const itemId = req.params.id;
        const updatedData = req.body;

        // Find the index of the item to be updated
        const index = vulnerabilityData.findIndex(item => item.id === itemId);

        if (index === -1) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Update the item
        vulnerabilityData[index] = { ...vulnerabilityData[index], ...updatedData };

        res.status(200).json({
            message: 'Item updated successfully',
            data: vulnerabilityData[index]
        });
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// DELETE endpoint: Remove a compliance item by ID
router.delete('/:id', (req, res) => {
    try {
        const itemId = req.params.id;

        // Find the index of the item to be deleted
        const index = vulnerabilityData.findIndex(item => item.id === itemId);

        if (index === -1) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Remove the item from the array
        vulnerabilityData.splice(index, 1);

        res.status(200).json({
            message: 'Item deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
