const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());


// MongoDB connection
mongoose.connect('mongodb://localhost:27017/secure-devops', {
    // Removed deprecated options
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});



app.use(cors(corsOptions)); 

// Import routes
const complianceRouter = require('./routes/compliance');
const incidentsRouter = require('./routes/Incidents');
const vulnerabilitiesRouter = require('./routes/vulnerabilities');
const incidentMetricsRouter = require('./routes/incidentMetrics');
const complianceMetricsRouter = require('./routes/ complianceMetrics');
const vulnerabilitiesMetricsRouter = require('./routes/vulnerabilitiesMetrics');

// Use routes   
app.use('/api/compliance', complianceRouter);
app.use('/api/incidents', incidentsRouter);
app.use('/api/vulnerabilities', vulnerabilitiesRouter);
app.use('/api/incidents/metrics', incidentMetricsRouter);
app.use('/api/compliance/metrics', complianceMetricsRouter);
app.use('/api/vulnerabilities/metrics', vulnerabilitiesMetricsRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
