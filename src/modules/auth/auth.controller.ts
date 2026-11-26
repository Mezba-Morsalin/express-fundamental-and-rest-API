import type { Request, Response } from "express";
import { authServices } from "./auth.service";

const loginUser = async (req : Request , res : Response) => {
    try {

        const result = await authServices.loginUserIntoDB(req.body)

        const {refreshToken} = result

        res.cookie("refreshToken", refreshToken, {
            secure : false,
            httpOnly : true,
            sameSite : "lax",
            path : "/",
            domain : "localhost"
        })

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

const generateToken = async (req : Request , res : Response) => {
    try {

        const result = await authServices.generateAccessToken(req.cookies.refreshToken)


        res.status(201).json({
            success: true,
            message: "Access Token Generated Successfully",
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
    loginUser,
    generateToken
}