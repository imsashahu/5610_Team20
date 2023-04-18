import mongoose from "mongoose";
import courseReviewsSchema, { reviewSchema } from "./course-review-schema.js";

export const reviewModel = mongoose.model("ReviewModel", reviewSchema);

const courseReviewModel = mongoose.model("CourseReview", courseReviewsSchema);

export default courseReviewModel;
