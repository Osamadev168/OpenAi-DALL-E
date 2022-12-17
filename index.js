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
App.use(bodyParser.json());
App.use("/", router);
