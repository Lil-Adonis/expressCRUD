import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      index: true,
      unique: true,
    },

    firstName: {
      type: String,
    },

    lastName: {
      type: String,
    },

    age: {
      type: String,
    },

    email: {
      type: String,
    },

    phoneNumber: {
      type: String,
    },

    gender: {
      type: String,
    },

    address: {
      type: String,
    },
    pinCode: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const userModel = mongoose.model("userModel", userSchema);
