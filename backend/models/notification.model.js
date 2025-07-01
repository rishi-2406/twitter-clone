import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      ref: "User",
      required: true,
    },
    to: {
      type: String,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum : [ 'follow' , 'like']
    },
    read : {
        type : Boolean,
        default : false,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Notification" , notificationSchema);
