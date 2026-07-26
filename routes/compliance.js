const express = require('express');
const router = express.Router();
const Compliance = require('../models/compliance');

const seedData = [
    {
        id: 'COMP-001',
        category: 'Access Control',
        description: 'Firestore security rules define least-privilege, per-collection read/write access instead of the default open/expired rule set. Deployed live via firebase deploy --only firestore:rules.',
        severity: 'High',
        status: 'Completed',
    },
    {
        id: 'COMP-002',
        category: 'Secrets Management',
        description: 'No credentials, API keys, or environment files are committed to version control. Firebase config (src/env.ts) and backend .env are untracked with real values kept local-only, and .gitignore blocks their reintroduction.',
        severity: 'High',
        status: 'Completed',
    },
    {
        id: 'COMP-003',
        category: 'CI/CD',
        description: 'Jenkins pipeline gates deployment on the backend Jest test suite passing (Install -> Test -> Deploy), so the deploy stage cannot run against an untested build.',
        severity: 'Medium',
        status: 'Completed',
    },
    {
        id: 'COMP-004',
        category: 'Vulnerability Management',
        description: 'Dependencies are reviewed with npm audit and tracked in this app\'s own Vulnerabilities section rather than silently ignored. Two known findings (undici via Firebase SDK, websocket-driver) remain open pending an Angular 20 migration.',
        severity: 'Medium',
        status: 'In Progress',
    },
];

async function seedIfEmpty() {
    const count = await Compliance.countDocuments();
    if (count === 0) {
        await Compliance.insertMany(seedData);
    }
}

// GET endpoint: Fetch all compliance items
router.get('/', async (req, res) => {
    try {
        await seedIfEmpty();
        const compliance = await Compliance.find().sort({ date: -1 });
        res.json(compliance);
    } catch (error) {
        console.error('Error fetching compliance data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// POST endpoint: Add new compliance items
router.post('/', async (req, res) => {
    try {
        const requestData = req.body;

        if (!Array.isArray(requestData)) {
            return res.status(400).json({ message: 'Invalid data format. Expected an array of compliance items.' });
        }

        const created = await Compliance.insertMany(requestData);

        res.status(201).json({
            message: 'Data added successfully',
            data: created,
        });
    } catch (error) {
        console.error('Error processing data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// PUT endpoint: Update an existing compliance item by ID
router.put('/:id', async (req, res) => {
    try {
        const updated = await Compliance.findOneAndUpdate(
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

// DELETE endpoint: Remove a compliance item by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Compliance.findOneAndDelete({ id: req.params.id });

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
