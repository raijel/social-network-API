import mongoose from "mongoose";

const banSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reason: {
      type: String,
      required: true,
    },
  },
  { timestamps: true}
);

export default mongoose.model("Ban", banSchema);