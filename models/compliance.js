const mongoose = require('mongoose');

const ComplianceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  severity: { type: String, required: true, enum: ['Critical', 'High', 'Medium', 'Low'] },
  status: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Compliance', ComplianceSchema);
