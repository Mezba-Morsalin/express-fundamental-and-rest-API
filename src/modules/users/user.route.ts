
import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { roles } from "../../types";

const router = Router();


router.post("/", userController.createUser);

router.get("/",auth(roles.admin, roles.moderator, roles.user), userController.getUser);

router.get("/:id", auth(roles.admin, roles.moderator), userController.getSingleUser);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

export const userRoute = router;
