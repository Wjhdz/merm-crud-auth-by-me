import mongoose from "mongoose";
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  },
  passowrd: {
    type: String,
    require: true,
  },
});
export default mongoose.model("user", UserSchema);
