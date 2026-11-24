import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from 'jsonwebtoken';
import config from "../config";
import { pool } from "../db";

const auth = async (req : Request, res : Response, next :NextFunction) => {
    
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

        req.user = decode

    next()
   } catch (error) {
    res.status(401).json({
        success : false,
        message : "Invalid or Expired Token!!!"
    })
   }
}

export default auth