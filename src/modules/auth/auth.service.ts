import bcrypt from "bcryptjs";
import { pool } from "../../db";

import jwt, { type JwtPayload } from "jsonwebtoken"
import config from "../../config";

const loginUserIntoDB = async (payload : {email : string; password : string}) => {
    const {email , password} = payload

    const user = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `, [email])

        console.log(user.rows[0]);

        if (user.rowCount === 0) {
            throw new Error("Invalid Credentials")
        }

        const matchPassword = await bcrypt.compare(password, user.rows[0].password)

        if(!matchPassword) {
            throw new Error("Invalid Credentials")
        }

        if (!user.rows[0].is_active) {
            throw new Error("User Access Denied")
        }

        const jwtPayload = {
            id : user.rows[0].id,
            name : user.rows[0].name,
            email : user.rows[0].email,
            role : user.rows[0].role
        }

        const accessToken = jwt.sign(jwtPayload, config.jwt_secret, {expiresIn : "1h"})
        const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh_secret, {expiresIn : "1d"})

        delete user.rows[0].password

        return {accessToken, refreshToken, user : user.rows[0]}
}

const generateAccessToken = async (token : string) => {

    try {

    if(!token) {
       throw new Error("Unauthorized Access!!!")
    }

    const decode = jwt.verify(token as string, config.jwt_refresh_secret) as JwtPayload

    const user = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `,[decode.email])

        if (user.rowCount === 0) {
           throw new Error("User Doesn't Exist!!!")
        }

        if(!user.rows[0].is_active) {
           throw new Error("Forbidden!!!")
        } 

        const jwtPayload = {
            id : user.rows[0].id,
            name : user.rows[0].name,
            email : user.rows[0].email,
            role : user.rows[0].role
        }

        const accessToken = jwt.sign(jwtPayload, config.jwt_secret, {expiresIn : "1h"})

        return {accessToken}


   } catch (error : any) {
    const err = new Error(error);
    (err as any).status = 401;

    console.log(err);
}
}

export const authServices = {
    loginUserIntoDB,
    generateAccessToken
}