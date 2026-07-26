const express = require('express');
const router = express.Router();
const Vulnerability = require('../models/Vulnerability');

const seedData = [
    {
        id: 'VULN-001',
        title: 'Unhandled exception on missing Authorization header',
        severity: 'Medium',
        description: 'authMiddleware.js called req.header("Authorization").split(" ") before checking whether the header existed, crashing the process on any request missing the header instead of returning 401. Fixed by validating the header before parsing it; regression covered by 4 new Jest tests.',
        status: 'Resolved',
    },
    {
        id: 'VULN-002',
        title: 'node_modules and .env committed to version control',
        severity: 'High',
        description: 'The backend submodule had node_modules/ (5,800+ files) and a .env file containing local config committed directly to git history. Untracked via git rm -r --cached and added to .gitignore to prevent secrets and environment-specific files from being pushed.',
        status: 'Resolved',
    },
    {
        id: 'VULN-003',
        title: 'Vulnerable undici dependency via Firebase SDK',
        severity: 'High',
        description: 'firebase@10.14.1 (required by @angular/fire@18) pulls in a vulnerable version of undici through @firebase/auth, @firebase/firestore, @firebase/functions, and @firebase/storage. Known issues include HTTP request/response smuggling, unbounded memory consumption in WebSocket permessage-deflate decompression, and Set-Cookie header injection. firebase 10.14.1 is already the newest release @angular/fire@18 will accept; the fix requires an Angular 20 + @angular/fire 20 migration.',
        status: 'Open',
    },
    {
        id: 'VULN-004',
        title: 'websocket-driver resource limit bypass and message corruption',
        severity: 'Critical',
        description: 'websocket-driver@0.7.5 is flagged critical (resource limit bypass via message compression, message corruption via protocol length header abuse). Reached through two paths: webpack-dev-server (build-time only, never shipped to production) and @firebase/database via faye-websocket (the Realtime Database client, a Firebase product this app does not use since only Firestore is active). Tracked as open pending upstream fix.',
        status: 'Open',
    },
];

async function seedIfEmpty() {
    const count = await Vulnerability.countDocuments();
    if (count === 0) {
        await Vulnerability.insertMany(seedData);
    }
}

// GET endpoint: Fetch all vulnerability items
router.get('/', async (req, res) => {
    try {
        await seedIfEmpty();
        const vulnerabilities = await Vulnerability.find().sort({ discovered: -1 });
        res.json(vulnerabilities);
    } catch (error) {
        console.error('Error fetching vulnerability data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// POST endpoint: Add new vulnerability items
router.post('/', async (req, res) => {
    try {
        const requestData = req.body;

        if (!Array.isArray(requestData)) {
            return res.status(400).json({ message: 'Invalid data format. Expected an array of vulnerability items.' });
        }

        const created = await Vulnerability.insertMany(requestData);

        res.status(201).json({
            message: 'Data added successfully',
            data: created,
        });
    } catch (error) {
        console.error('Error processing data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// PUT endpoint: Update an existing vulnerability item by ID
router.put('/:id', async (req, res) => {
    try {
        const updated = await Vulnerability.findOneAndUpdate(
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

// DELETE endpoint: Remove a vulnerability item by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Vulnerability.findOneAndDelete({ id: req.params.id });

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
