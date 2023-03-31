import courseReviewModel from "./course-review-model.js";

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

export const getById = async (id) => {
  return courseReviewModel.findById(id);
};

export const getByCourseNumber = async (courseNumber) => {
  return courseReviewModel.find({ courseNumber });
};

export const getAll = async () => {
  return courseReviewModel.find();
};

export const addReview = async (courseId, reviewData) => {
  const course = await courseReviewModel.findById(courseId);
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
