import { Router, type Request, type Response } from "express";
import app from "../../server";
import { pool } from "../../db";

const router = Router()

router.post("/", async (req: Request, res: Response) => {

    try {
        const { name, email, password, age } = req.body

        const result = await pool.query(`
            INSERT INTO users (name, email, password, age) VALUES
            ($1, $2, $3, $4) RETURNING *
        `, [name, email, password, age]);

        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            author: "Mezba Morsalin",
            data: result.rows[0]
        })

    } catch (error: any) {

        if (error.code === "23505") {
            return res.status(409).json({
                success: false,
                message: "Email already exists!",
                data: null
            })
        }

        res.status(500).json({
            success: false,
            message: error.message,
            data: null
        })
    }

});

export const userRoute = router