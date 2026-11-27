import type { Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../utils/sendResponse";

const createUser = async (req: Request, res: Response) => {
    try {
        
        const result = await userService.createUserDB(req.body)

        sendResponse(res, {
            status : 201,
            success : true,
            message : "User Created Successfully",
            data : result.rows[0]
        })

    } 
catch (error: any) {

    if (error.code === "23505") {
        return sendResponse(res, {
            status: 409,
            success: false,
            message: "Email already exists!",
            data: null
        });
    }

    return sendResponse(res, {
        status: 500,
        success: false,
        message: error.message || "Internal Server Error",
        data: null
    });
}

}

const getUser = async (req : Request, res : Response) => {

    try {
        
        const result = await userService.getUserFromDB()

        if(result.rowCount === 0) {
               return sendResponse(res, {
                status : 404,
                success : false,
                message : "User not Found",
               })}

    sendResponse(res, {
        status : 200,
        success : true,
        message : "This is Express User Root Route",
        data : result.rows
    })
    } catch (error : any) {
        sendResponse(res, {
            status : 500,
            success : false,
            message : error?.message
        })
    }
}

const getSingleUser = async (req : Request, res : Response) => {
    try {

        const {id} = req.params

        const result = await userService.getSingleUserFromDB(id as string)

            if(result.rowCount === 0) {
               return sendResponse(res, {
                status : 404,
                success : false,
                message : "User not Found",
               })}

    sendResponse(res, {
        status : 200,
        success : true,
        message : "This is Express Single User Route",
        data : result.rows[0]
    })
        
    } catch (error : any) {
         sendResponse(res, {
            status : 500,
            success : false,
            message : error?.message
        })
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {

        const {id}= req.params
        
        const result = await userService.updateUserFromDB(req.body, id as string)

            if(result.rowCount === 0) {
               return sendResponse(res, {
                status : 404,
                success : false,
                message : "User not Found",
               })}

    sendResponse(res, {
        status : 201,
        success : true,
        message : "User Updated Successfully",
        data : result.rows[0]
    })
        
    } catch (error : any) {
         sendResponse(res, {
            status : 500,
            success : false,
            message : error?.message
        })
    }
}

const deleteUser = async(req: Request, res: Response) => {
    try {

        const {id} = req.params

        const result = await userService.deleteUserFromDB(id as string)

           if(result.rowCount === 0) {
               return sendResponse(res, {
                status : 404,
                success : false,
                message : "User not Found",
               })}

    sendResponse(res, {
        status : 201,
        success : true,
        message : "User Deleted Successfully",
        data : result.rows[0]
    })
        
    } catch (error : any) {
         sendResponse(res, {
            status : 500,
            success : false,
            message : error?.message
        })
    }
}

export const userController = {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser
}