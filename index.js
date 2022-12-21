import express from "express";
import dotev from "dotenv";
import { router } from "./Routes/routes.js";
import cors from "cors";
import bodyParser from "body-parser";
const App = express();
const dotenv = dotev.config();
const port = process.env.PORT || 5000;
App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
App.use(cors());
App.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5174");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
App.use(bodyParser.json());
App.use("/", router);
App.get("/", (req, res) => {
  res.json("this is base url");
});
