import express from "express";
import { Controller } from "../Controllers/Controller.js";

const Router = express.Router();

export const router = Router.post("/genimage", Controller);
