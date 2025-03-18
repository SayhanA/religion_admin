const { Schema, default: mongoose } = require("mongoose");

const casteSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  religionId: {
    type: Schema.Types.ObjectId,
    ref: "Religion",
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  updatedOn: {
    type: Date,
  },
});

module.exports = mongoose.model("Caste", casteSchema);
