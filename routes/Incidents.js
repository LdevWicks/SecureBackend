
const express = require('express');
const router = express.Router();

let incidentData = [ // In-memory storage for compliance data
    { id: 'INC-001', name: 'Data Breach', description: 'Unauthorized access to customer data', severity: 'Critical', status: 'Investigating', date: '2024-08-01' },
    { id: 'INC-002', name: 'Phishing Attack', description: 'Employee email compromised', severity: 'High', status: 'Resolved', date: '2024-07-15' },
    { id: 'INC-003', name: 'Ransomware', description: 'Malware encrypted company files', severity: 'Critical', status: 'Ongoing', date: '2024-07-28' },
    { id: 'INC-004', name: 'DDoS Attack', description: 'Service disruption due to traffic overload', severity: 'Medium', status: 'Mitigated', date: '2024-06-30' }
];

// GET endpoint: Fetch all compliance items
router.get('/', (req, res) => {
    console.log('Fetched incident data:', incidentData);
    res.json(incidentData); 
});

// POST endpoint: Add new compliance items
router.post('/', (req, res) => {
    try {
        const requestData = req.body;

        // Ensure requestData is an array
        if (!Array.isArray(requestData)) {
            return res.status(400).json({ message: 'Invalid data format. Expected an array of incident items.' });
        }

        incidentData = [...incidentData, ...requestData];

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
        const index = incidentData.findIndex(item => item.id === itemId);

        if (index === -1) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Update the item
        incidentData[index] = { ...incidentData[index], ...updatedData };

        res.status(200).json({
            message: 'Item updated successfully',
            data: incidentData[index]
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
        const index = incidentData.findIndex(item => item.id === itemId);

        if (index === -1) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Remove the item from the array
        incidentData.splice(index, 1);

        res.status(200).json({
            message: 'Item deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
