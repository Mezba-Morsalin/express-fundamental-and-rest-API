
import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const router = Router();

const roles = {
    admin : "admin",
    moderator : "moderator",
    user : "user"
} as const

router.post("/", userController.createUser);

router.get("/",auth(roles.admin, roles.moderator, roles.user), userController.getUser);

router.get("/:id", userController.getSingleUser);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

export const userRoute = router;
