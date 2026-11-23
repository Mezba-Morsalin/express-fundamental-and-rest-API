import type { NextFunction, Request, Response } from "express";

const auth = async (req : Request, res : Response, next :NextFunction) => {
    
    const token = req.headers.authorization

    if(!token) {
        res.status(404).json({
        success : false,
        message : "Unauthorized Access!!!"
    })
    }

    next()
}

export default auth