require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: [
        'https://pwa5-89c3b.web.app',
        'https://pwa5-89c3b.firebaseapp.com',
        'http://localhost:4200',
    ],
}));


// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/secure-devops')
.then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});



// Import routes
const complianceRouter = require('./routes/compliance');
const incidentsRouter = require('./routes/Incidents');
const vulnerabilitiesRouter = require('./routes/vulnerabilities');
const incidentMetricsRouter = require('./routes/incidentMetrics');
const complianceMetricsRouter = require('./routes/complianceMetrics');
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
