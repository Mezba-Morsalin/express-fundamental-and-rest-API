import { Router } from "express";
import { profileController } from "./profile.controller";

const router = Router();

router.post("/", profileController.createProfile)

router.get("/" , profileController.getProfile)
router.get("/:id" , profileController.getSingleProfile)

export const profileRoute = router