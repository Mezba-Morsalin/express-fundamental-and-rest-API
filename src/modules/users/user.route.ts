import { Router, type Request, type Response } from "express";
import app from "../../server";
import { pool } from "../../db";
import { userController } from "./user.controller";

const router = Router()

router.post("/", userController.createUser);

router.get("/", userController.getUser);

router.get("/:id", userController.getSingleUser)

export const userRoute = router