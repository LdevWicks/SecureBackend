const express = require('express');
const router = express.Router();
const Incident = require('../models/Incidents');

const seedData = [
    {
        id: 'INC-001',
        name: 'Auth middleware crash on missing Authorization header',
        category: 'Application Security',
        description: 'Traced to VULN-001: authMiddleware.js parsed the Authorization header before checking it existed, crashing the request handler instead of returning 401. Fixed and covered by 4 new Jest tests.',
        severity: 'Medium',
        status: 'Resolved',
        date: new Date('2026-07-25'),
    },
    {
        id: 'INC-002',
        name: 'Secrets and node_modules committed to version control',
        category: 'Data Exposure',
        description: 'Traced to VULN-002: the backend submodule had node_modules/ (5,800+ files) and a .env file committed directly to git history. Remediated with git rm -r --cached and a .gitignore update.',
        severity: 'High',
        status: 'Resolved',
        date: new Date('2026-07-25'),
    },
    {
        id: 'INC-003',
        name: 'Undici vulnerability identified in Firebase dependency chain',
        category: 'Dependency Management',
        description: 'Traced to VULN-003: npm audit flagged undici (HTTP smuggling, WebSocket memory exhaustion, Set-Cookie injection) as a transitive dependency of the Firebase SDK. No fix available until an Angular 20 + @angular/fire 20 migration; monitored as open.',
        severity: 'High',
        status: 'Investigating',
        date: new Date('2026-07-25'),
    },
    {
        id: 'INC-004',
        name: 'websocket-driver critical advisory under review',
        category: 'Dependency Management',
        description: 'Traced to VULN-004: npm audit flagged websocket-driver (resource limit bypass, message corruption) as critical. Reached via webpack-dev-server (dev-only) and the unused Firebase Realtime Database client. Monitored as open pending upstream fix.',
        severity: 'Critical',
        status: 'Investigating',
        date: new Date('2026-07-25'),
    },
];

async function seedIfEmpty() {
    const count = await Incident.countDocuments();
    if (count === 0) {
        await Incident.insertMany(seedData);
    }
}

// GET endpoint: Fetch all incident items
router.get('/', async (req, res) => {
    try {
        await seedIfEmpty();
        const incidents = await Incident.find().sort({ date: -1 });
        res.json(incidents);
    } catch (error) {
        console.error('Error fetching incident data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// POST endpoint: Add new incident items
router.post('/', async (req, res) => {
    try {
        const requestData = req.body;

        if (!Array.isArray(requestData)) {
            return res.status(400).json({ message: 'Invalid data format. Expected an array of incident items.' });
        }

        const created = await Incident.insertMany(requestData);

        res.status(201).json({
            message: 'Data added successfully',
            data: created,
        });
    } catch (error) {
        console.error('Error processing data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// PUT endpoint: Update an existing incident item by ID
router.put('/:id', async (req, res) => {
    try {
        const updated = await Incident.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({
            message: 'Item updated successfully',
            data: updated,
        });
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// DELETE endpoint: Remove an incident item by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Incident.findOneAndDelete({ id: req.params.id });

        if (!deleted) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({
            message: 'Item deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
