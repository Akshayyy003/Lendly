const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  itemDescription: { type: String, required: true },
  category: { type: String, required: true },
  dateNeeded: { type: String, required: true },
  timeNeeded: { type: String, required: true },
  duration: { type: String, required: true },
  city: { type: String, required: true },
  area: { type: String, required: true },
  notes: { type: String },
  status: { type: String, enum: ["open", "fulfilled", "closed"], default: "open" },
}, { timestamps: true });

module.exports = mongoose.model("Request", RequestSchema);
