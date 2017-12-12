const mongoose = require ('../config/database')
const { Schema } = mongoose

const evaluationSchema = new Schema({
  date: { type: Date, default: Date.now },
  color: { type: String, required: true },
  student: [{ type: Schema.Types.ObjectId, ref: 'students '}],
});

module.exports = mongoose.model('evaluations', evaluationSchema)
