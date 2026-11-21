import express, { type Application, type Request, type Response } from 'express';

import { pool } from './db';
import { userRoute } from './modules/users/user.route';

const app : Application = express()

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded())

app.get("/", (req : Request, res : Response) => {
    res.status(200).json({
        success : true,
        message : "This is Express Root Route",
        author : "Mezba Morsalin"
    })
});




app.get("/api/v1/users/:id", async (req : Request, res : Response) => {
    try {

        const {id} = req.params

        const result = await pool.query(`
            SELECT * FROM users WHERE id=$1
            `,[id])

            if(result.rowCount === 0) {
               return res.status(404).json({
        success: false,
        message: "User not Found"
    })}

            res.status(200).json({
        success : true,
        message : "This is Express User Root Route",
        author : "Mezba Morsalin",
        data : result.rows[0]
    })
        
    } catch (error : any) {
        res.status(500).json({
        success: false,
        message: error?.message,
        data: null
    })
    }
})

app.use("/api/v1/users", userRoute)

app.put("/api/v1/users/:id",async (req: Request, res: Response) => {
    try {

        const {id}= req.params
        const {name, password, is_Active, age} = req.body

        const result = await pool.query(`
            UPDATE users
            SET
            name = COALESCE($1, name),
            password = COALESCE($2, password),
            is_Active = COALESCE($3, is_Active),
            age = COALESCE($4, age),
            updated_at = NOW()

            WHERE id=$5 RETURNING *

            `, [name ?? null, password ?? null, is_Active ?? null, age ?? null, id])

            if(result.rowCount === 0) {
               return res.status(404).json({
        success: false,
        message: "User not Found"
    })}

        res.status(201).json({
            success: true,
            message: "User Updated Successfully",
            author: "Mezba Morsalin",
            data: result.rows[0]
        })
        
    } catch (error : any) {
        res.status(500).json({
        success: false,
        message: error?.message,
        data: null
    })
    }
})

app.delete("/api/v1/users/:id", async(req: Request, res: Response) => {
    try {

        const {id} = req.params

        const result = await pool.query(`
            DELETE FROM users
            WHERE id=$1 RETURNING *
            `, [id])

            if(result.rowCount === 0) {
               return res.status(404).json({
        success: false,
        message: "User not Found"
    })
            }
            res.status(201).json({
            success: true,
            message: "User Deleted Successfully",
            author: "Mezba Morsalin",
            data: result.rows[0]
        })
        
    } catch (error : any) {
        res.status(500).json({
        success: false,
        message: error?.message,
        data: null
    })
    }
})

export default app