import mongoose from "mongoose";

const popostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  link: { type: String, required: true },
  isproject: { type: Boolean, required: true },
});

export default mongoose.models.Popost ||
  mongoose.model("Popost", popostSchema);