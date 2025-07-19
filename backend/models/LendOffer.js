const mongoose = require("mongoose");

const LendOfferSchema = new mongoose.Schema({
  lenderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  borrowerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: "Request", required: true },
  itemName: { type: String, required: true },
  hourlyRate: { type: Number, required: true },
  deposit: { type: Number, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  availabilityDate: { type: String, required: true },
  availabilityTime: { type: String, required: true },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("LendOffer", LendOfferSchema);
    