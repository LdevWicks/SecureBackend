const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Import routes
const complianceRouter = require('./routes/compliance');
const incidentsRouter = require('./routes/Incidents');
const vulnerabilitiesRouter = require('./routes/vulnerabilities');

// Use routes
app.use('/api/compliance', complianceRouter);
app.use('/api/incidents', incidentsRouter);
app.use('/api/vulnerabilities', vulnerabilitiesRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
