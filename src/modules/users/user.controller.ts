import type { Request, Response } from "express";
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

const getUser = async (req : Request, res : Response) => {

    try {
        
        const result = await userService.getUserFromDB()

        if(result.rowCount === 0) {
               return res.status(404).json({
        success: false,
        message: "User not Found"
    })}

    res.status(200).json({
        success : true,
        message : "This is Express User Root Route",
        author : "Mezba Morsalin",
        data : result.rows
    })
    } catch (error : any) {
        res.status(500).json({
        success: false,
        message: error?.message,
        data: null
    })
    }
}

export const userController = {
    createUser,
    getUser
}