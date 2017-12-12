const mongoose = require('../config/database')
const { Schema } = mongoose

const evaluationSchema = new Schema({
  date: { type: Date, default: Date.now },
  color: { type: String, default: 'green', required: true},
});

const studentSchema = new Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  evaluations: [evaluationSchema],
});

const batchSchema = new Schema({
  batchNumber: { type: String, required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: Date.now },
  students: [studentSchema],
});

module.exports = mongoose.model('batches', batchSchema)
