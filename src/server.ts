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


app.use("/api/v1/users", userRoute)

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