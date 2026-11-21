import { Router, type Request, type Response } from "express";
import app from "../../server";
import { pool } from "../../db";
import { userController } from "./user.controller";

const router = Router()

router.post("/", userController.createUser);

export const userRoute = router