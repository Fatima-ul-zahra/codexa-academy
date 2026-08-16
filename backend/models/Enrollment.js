const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, "Student name is required."],
      trim: true,
      minlength: [2, "Student name must be at least 2 characters."],
      maxlength: [100, "Student name cannot exceed 100 characters."],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required."],
      trim: true,
      maxlength: [30, "Phone number is too long."],
    },

    email: {
      type: String,
      required: [true, "Email is required."],
      trim: true,
      lowercase: true,
      maxlength: [150, "Email cannot exceed 150 characters."],
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address.",
      ],
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course is required."],
    },

    education: {
      type: String,
      required: [true, "Education is required."],
      trim: true,
      maxlength: [150, "Education cannot exceed 150 characters."],
    },

    city: {
      type: String,
      required: [true, "City is required."],
      trim: true,
      maxlength: [100, "City cannot exceed 100 characters."],
    },

    message: {
      type: String,
      trim: true,
      maxlength: [1000, "Message cannot exceed 1000 characters."],
      default: "",
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Contacted",
        "Enrolled",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Enrollment",
  enrollmentSchema
);