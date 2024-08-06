const mongoose = require('mongoose');

const IncidentSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  severity: String,
  status: String,
  date: Date,
});

module.exports = mongoose.model('Incident', IncidentSchema);
