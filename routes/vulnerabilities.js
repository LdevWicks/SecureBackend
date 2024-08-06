// src/routes/vulnerabilities.js

const express = require('express');
const router = express.Router();

// Define route to get vulnerabilities
router.get('/', (req, res) => {
    // Placeholder for fetching vulnerabilities from the database
    res.json([{ id: 1, name: 'Vulnerability 1' }]);
});

module.exports = router;
