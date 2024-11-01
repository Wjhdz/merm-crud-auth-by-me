import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  document: { type: String, required: true, unique: true },
  email: { type: String },
  adress: { type: String },
  phone1: { type: Number, required: true },
  phone2: { type: Number },

  eps: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Patient", UserSchema);
