import type { Request, Response } from "express";

const loginUser = async (req : Request , res : Response) => {
    try {

        const result = ""

        res.status(201).json({
            success: true,
            message: "User Logged in Successfully",
            author: "Mezba Morsalin",
            data: result,
        })
    } catch (error : any) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: null
        })
    }
}

export const authController = {
    loginUser
}