const express = require('express');
const router = express.Router();

let complianceData = [ // In-memory storage for compliance data
    { id: 'COMP-001', category: 'Data Privacy', description: 'GDPR Compliance', severity: 'High', status: 'In Progress' },
    { id: 'COMP-002', category: 'Security', description: 'ISO 27001 Certification', severity: 'Medium', status: 'Completed' },
    { id: 'COMP-003', category: 'Financial', description: 'SOX Compliance', severity: 'Critical', status: 'Pending' },
    { id: 'COMP-004', category: 'Legal', description: 'HIPAA Compliance', severity: 'Low', status: 'Completed' }
];

// GET endpoint: Fetch all compliance items
router.get('/', (req, res) => {
    console.log('Fetched compliance data:', complianceData);
    res.json(complianceData); 
});

// POST endpoint: Add new compliance items
router.post('/', (req, res) => {
    try {
        const requestData = req.body;

        // Ensure requestData is an array
        if (!Array.isArray(requestData)) {
            return res.status(400).json({ message: 'Invalid data format. Expected an array of compliance items.' });
        }

        complianceData = [...complianceData, ...requestData];

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
        const index = complianceData.findIndex(item => item.id === itemId);

        if (index === -1) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Update the item
        complianceData[index] = { ...complianceData[index], ...updatedData };

        res.status(200).json({
            message: 'Item updated successfully',
            data: complianceData[index]
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
        const index = complianceData.findIndex(item => item.id === itemId);

        if (index === -1) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Remove the item from the array
        complianceData.splice(index, 1);

        res.status(200).json({
            message: 'Item deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

