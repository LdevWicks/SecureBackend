const mongoose = require('mongoose');

const ComplianceSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  status: String,
});

module.exports = mongoose.model('Compliance', ComplianceSchema);
