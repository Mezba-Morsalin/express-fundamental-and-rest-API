import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from 'jsonwebtoken';
import config from "../config";
import { pool } from "../db";
import type { TypeByRole } from "../types";

const auth = (...roles : TypeByRole []) => {
    return async (req : Request, res : Response, next :NextFunction) => {

        // console.log(role);
    
   try {
     const token = req.headers.authorization

    if(!token) {
       return res.status(404).json({
        success : false,
        message : "Unauthorized Access!!!"
    })
    }

    const decode = jwt.verify(token as string, config.jwt_secret) as JwtPayload

    const user = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `,[decode.email])

        if (user.rowCount === 0) {
           return res.status(404).json({
        success : false,
        message : "User Doesn't Exist!!!"
    })
        }

        if(!user.rows[0].is_active) {
           return res.status(404).json({
        success : false,
        message : "Forbidden!!!"
    })
        } 

        if(roles.length && !roles.includes(user.rows[0].role)) {
            return res.status(404).json({
        success : false,
        message : "Unauthorized Access!!!"
    })
        }

        req.user = decode

    next()
   } catch (error : any) {
    const err = new Error(error);
    (err as any).status = 401;

    next(err);
}
}
}

export default auth