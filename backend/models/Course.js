const mongoose = require("mongoose");

const syllabusModuleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Syllabus module title is required"],
      trim: true,
      maxlength: 150,
    },

    topics: {
      type: [String],
      default: [],
    },
  },
  {
    _id: false,
  }
);

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Course name is required"],
      trim: true,
      minlength: 2,
      maxlength: 150,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
      maxlength: 300,
    },

    description: {
      type: String,
      required: [true, "Course description is required"],
      trim: true,
      maxlength: 5000,
    },

    image: {
      type: String,
      trim: true,
      default: "",
    },

    fee: {
      type: Number,
      required: [true, "Course fee is required"],
      min: [0, "Course fee cannot be negative"],
    },

    duration: {
      type: String,
      required: [true, "Course duration is required"],
      trim: true,
      maxlength: 100,
    },

    level: {
      type: String,
      required: [true, "Course level is required"],
      enum: {
        values: ["Beginner", "Intermediate", "Advanced"],
        message: "Invalid course level",
      },
    },

    category: {
      type: String,
      required: [true, "Course category is required"],
      trim: true,
      maxlength: 100,
    },

    learningOutcomes: {
      type: [String],
      default: [],
    },

    syllabus: {
      type: [syllabusModuleSchema],
      default: [],
    },

    technologies: {
      type: [String],
      default: [],
    },

    prerequisites: {
      type: [String],
      default: [],
    },

    certificate: {
      type: Boolean,
      default: false,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

courseSchema.index({
  name: "text",
  shortDescription: "text",
  description: "text",
  category: "text",
});

courseSchema.index({
  featured: 1,
  isActive: 1,
});

module.exports = mongoose.model("Course", courseSchema);