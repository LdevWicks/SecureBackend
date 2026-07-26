const mongoose = require('mongoose');

const IncidentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String },
  description: { type: String, required: true },
  severity: { type: String, required: true, enum: ['Critical', 'High', 'Medium', 'Low'] },
  status: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Incident', IncidentSchema);
