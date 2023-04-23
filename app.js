import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";

dotenv.config();

const app = express();
app.use(
  session({
    secret: "any string",
    resave: false,
    cookie: { secure: false },
    saveUninitialized: true,
  })
);

app.use(bodyParser.json());
app.use(cors());

const CONNECTION_STRING = `${process.env.CONNECTION_STRING}`;
mongoose.connect(CONNECTION_STRING);

import courseReviewController from "./controllers/course-review-controller/index.js";
import UsersController from "./controllers/users/users-controller.js";
app.get("/hello", (req, res) => {
  res.send("Life is good!");
});
app.get("/", (req, res) => {
  console.log(req.body);
  res.send("Welcome to Full Stack Development!");
});

courseReviewController(app);
UsersController(app);
const port = process.env.PORT || 4001;
app.listen(port);
