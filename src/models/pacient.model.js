import mongoose from "mongoose";

const pacientSchema = mongoose.Schema({
  name: {
    name: { type: String, require: true },
    lastName: { type: String, require: true },
  },
  contact: {
    email: { type: String, require: true },
    adress: { type: String },
    phone: { type: Number, require: true },
    phone2: { type: Number },
  },
  eps: {
    type: String,
    require: true,
  },
});

export default mongoose.model("Pacient", pacientSchema);
