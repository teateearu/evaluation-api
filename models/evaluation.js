const mongoose = require('../config/database')
const { Schema } = mongoose

const evaluationSchema = new Schema({
  date: { type: Date, default: Date.now },
  color: { type: String, default: 'green', required: true },
  student_id: { type: Schema.Types.ObjectId, ref: 'students' },
});

module.exports = mongoose.model('evaluations', evaluationSchema)
