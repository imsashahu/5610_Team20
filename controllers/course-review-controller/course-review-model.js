import mongoose from "mongoose";
import courseReviewsSchema from "./course-review-schema.js";
const courseReviewModel = mongoose.model("CourseReview", courseReviewsSchema);
export default courseReviewModel;
