import type { Request, Response } from "express";
import { profileService } from "./profile.service";

const createProfile = async (req :Request , res : Response) => {
    try {

        const result = await profileService.createProfileIntoDB(req.body)

        res.status(201).json({
            success: true,
            message: "Profile Created Successfully",
            author: "Mezba Morsalin",
            data: result.rows[0],
        })
    } catch (error : any) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: null
        })
    }
}


const getProfile = async (req :Request , res : Response) => {
    try {
        const result = await profileService.getProfileFromDB()

        if(result.rowCount === 0) {
               return res.status(404).json({
        success: false,
        message: "User not Found"
    })}

        res.status(200).json({
            success: true,
            message: "Profile Retrived",
            author: "Mezba Morsalin",
            data: result.rows
        })
        
    } catch (error : any) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: null
        })
    }
}

export const profileController = {
    createProfile,
    getProfile
}