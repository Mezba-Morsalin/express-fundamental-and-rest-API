import type { Request, Response } from "express";
import { profileService } from './profile.service';

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
            message: "Profile Retrieved",
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

const getSingleProfile = async (req :Request , res : Response) => {

    try {

        const {id} = req.params

        const result = await profileService.getSingleProfileFromDB(id as string)

        if(result.rowCount === 0) {
               return res.status(404).json({
        success: false,
        message: "User not Found"
    })}

    res.status(200).json({
            success: true,
            message: "Single Profile  Retrieved",
            author: "Mezba Morsalin",
            data: result.rows[0]
        })
        
    } catch (error : any) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: null
        })
    }
}

const updateProfile = async (req :Request , res : Response) => {
    try {
        const {id} = req.params

        const result = await profileService.updateProfileFromDB(req.body, id as string)

       if (result.rowCount === 0) {
    return res.status(404).json({
        success: false,
        message: "Profile not found. Please check the user ID."
    });
}

        res.status(200).json({
            success: true,
            message: " Profile Updated Successfully",
            author: "Mezba Morsalin",
            data: result.rows[0]
        })
    } catch (error : any) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: null
        })
    }
}

const deleteProfile = async (req :Request , res : Response) => {
    try {

        const {id} = req.params

        const result = await profileService.deleteProfileFromDB(id as string)

        if(result.rowCount === 0) {
               return res.status(404).json({
        success: false,
        message: "User not Found"
    })}

    res.status(200).json({
            success: true,
            message: "User Profile Deleted Successfully",
            author: "Mezba Morsalin",
            data: result.rows[0]
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
    getProfile,
    getSingleProfile,
    updateProfile,
    deleteProfile
}