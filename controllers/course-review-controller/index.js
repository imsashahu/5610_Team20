import * as courseDao from "./course-review-dao.js";
import courseReviewModel from "./course-review-model.js";

export const create = async (req, res, next) => {
  console.log(req.body);
  const course = new courseReviewModel({
    ...req.body,
    reviews: [],
  });
  const createdCourse = await courseDao.create(course);
  res.status(201).json(createdCourse);
};

export const getById = async (req, res, next) => {
  try {
    const course = await courseDao.getById(req.params.id);
    res.json(course);
  } catch (err) {
    next(err);
  }
};

export const getByCourseNumber = async (req, res, next) => {
  try {
    const course = await courseDao.getByCourseNumber(req.params.courseNumber);
    console.log("req.params.courseNumber", req.params.courseNumber);
    res.json(course);
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const courses = await courseDao.getAll();
    res.json(courses);
  } catch (err) {
    next(err);
  }
};

export const addReview = async (req, res, next) => {
  try {
    console.log("req.body", req.body);
    console.log("req.params.courseNumber", req.params.courseNumber);
    const course = await courseDao.addReview(req.params.courseNumber, req.body);
    res.json(course);
  } catch (err) {
    next(err);
  }
};

export default (app) => {
  app.get("/courses", getAll);
  app.get("/courses/:courseNumber", getByCourseNumber);
  app.post("/courses", create);
  app.post("/courses/:courseNumber/reviews", addReview);
};
