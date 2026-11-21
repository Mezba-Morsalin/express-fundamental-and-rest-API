import type { Request, Response } from "express";
import { pool } from "../../db";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try {
        
        const result = await userService.createUserDB(req.body)

        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            author: "Mezba Morsalin",
            data: result.rows[0]
        })

    } catch (error: any) {

        if (error.code === "23505") {
            return res.status(409).json({
                success: false,
                message: "Email already exists!",
                data: null
            })
        }

        res.status(500).json({
            success: false,
            message: error.message,
            data: null
        })
    }
}

export const userController = {
    createUser
}