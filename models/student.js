// models/student.js
const mongoose = require('../config/database')
const { Schema } = mongoose

const evaluationSchema = new Schema({
  date: { type: Date, default: Date.now },
  color: { type: String, default: 'green', required: true },
});

const studentSchema = new Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  evaluations: [evaluationSchema],
});

module.exports = mongoose.model('students', studentSchema)
