import courseReviewModel, { reviewModel } from "./course-review-model.js";

export const create = async (courseData) => {
  const course = new courseReviewModel(courseData);
  return course
    .save()
    .then((savedCourse) => {
      console.log(`Course ${savedCourse.courseNumber} saved to database`);
      return savedCourse;
    })
    .catch((error) => {
      console.log(`Error saving course: ${error}`);
      return error.message;
    });
};

export const updateCourseByCourseNumber = async (courseNumber, update) => {
  try {
    const course = courseReviewModel.find({ courseNumber: courseNumber });
    const updatedCourse = await courseReviewModel.findOneAndUpdate(
      { courseNumber },
      update,
      { upsert: false }
    );
    if (!updatedCourse) throw new Error(`Course ${courseNumber} not found.`);
    return course;
  } catch (error) {
    throw new Error(
      `Could not update course ${courseNumber}: ${error.message}`
    );
  }
};

export const getById = async (id) => {
  return courseReviewModel.findById(id);
};

export const getByCourseNumber = async (courseNumber) => {
  return courseReviewModel.find({ courseNumber });
};

export const getAll = async () => {
  return courseReviewModel.find();
};

export const addReview = async (courseNumber, reviewData) => {
  const course = await courseReviewModel.findOne({
    courseNumber: courseNumber,
  });
  console.log("course", course);
  console.log("reviewData", reviewData);
  course.reviews.push(reviewData);
  course.numOfReviews += 1;
  course.averageRate =
    (course.averageRate * (course.numOfReviews - 1) + reviewData.rate) /
    course.numOfReviews;
  course.easiness =
    (course.easiness * (course.numOfReviews - 1) + reviewData.easiness) /
    course.numOfReviews;
  course.usefulness =
    (course.usefulness * (course.numOfReviews - 1) + reviewData.usefulness) /
    course.numOfReviews;
  await course.save();
  return course;
};

export const updateReviewForCourse = async (courseNumber, reviewId, update) => {
  try {
    const courseReview = await courseReviewModel.findOne({ courseNumber });
    if (!courseReview) throw new Error(`Course ${courseNumber} not found.`);
    const review = courseReview.reviews.id(reviewId);
    if (!review) throw new Error(`Review ${reviewId} not found.`);
    review.set(update);
    await courseReview.save();
    return courseReview;
  } catch (error) {
    throw new Error(
      `Could not update review ${reviewId} for course ${courseNumber}: ${error.message}`
    );
  }
};

export const deleteReviewByIdForCourse = async (courseNumber, reviewId) => {
  try {
    const courseReview = await courseReviewModel.findOne({ courseNumber });
    if (!courseReview) throw new Error(`Course ${courseNumber} not found.`);
    const review = courseReview.reviews.id(reviewId);
    if (!review) throw new Error(`Review ${reviewId} not found.`);
    review.deleteOne({ _id: reviewId });
    courseReview.numOfReviews -= 1;
    courseReview.averageRate =
      (courseReview.averageRate * (courseReview.numOfReviews + 1) -
        review.rate) /
      courseReview.numOfReviews;
    courseReview.easiness =
      (courseReview.easiness * (courseReview.numOfReviews + 1) -
        review.easiness) /
      courseReview.numOfReviews;
    courseReview.usefulness =
      (courseReview.usefulness * (courseReview.numOfReviews + 1) -
        review.usefulness) /
      courseReview.numOfReviews;
    await courseReview.save();
    return courseReview;
  } catch (error) {
    throw new Error(
      `Could not delete review ${reviewId} for course ${courseNumber}: ${error.message}`
    );
  }
};

export const getAllReviewsByUserId = async (userId) => {
  courseReviewModel.aggregate(
    [{ $unwind: "$reviews" }, { $match: { "reviews.postedBy": userId } }],
    (err, reviews) => {
      if (err) {
        console.error(err);
      } else {
        console.log(reviews);
      }
    }
  );
  return courseReviewModel.find({ "reviews.user": userId });
};
