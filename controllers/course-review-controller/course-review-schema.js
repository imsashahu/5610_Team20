import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  professor: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  easiness: {
    type: Number,
    required: true,
  },
  usefulness: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

const courseReviewsSchema = new mongoose.Schema({
  courseNumber: {
    type: String,
    required: true,
  },
  averageRate: {
    type: Number,
    default: 0,
  },
  easiness: {
    type: Number,
    default: 0,
  },
  usefulness: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [reviewSchema],
});

export default courseReviewsSchema;
