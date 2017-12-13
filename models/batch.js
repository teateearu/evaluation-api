const mongoose = require('../config/database')
const { Schema } = mongoose

const batchSchema = new Schema({
  batchNumber: { type: String, required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('batches', batchSchema)
