import express, { type Application, type Request, type Response } from 'express';
import { Pool } from 'pg';

const app : Application = express()

const port = 5000

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded())

const pool= new Pool({
    connectionString : ""
});

// console.log(pool);

const initDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS Users(
            id SERIAL PRIMARY KEY,
            name VARCHAR (255),
            email VARCHAR (255) UNIQUE NOT NULL,
            password VARCHAR (255) NOT NULL,
            age INTEGER,
            is_Active BOOLEAN DEFAULT true,

            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )
            `)

            console.log("Database Connected Successfully");
    } catch (error) {
        console.log(error);
    }
}

initDB()

app.get("/", (req : Request, res : Response) => {
    res.status(200).json({
        success : true,
        message : "This is Express Root Route",
        author : "Mezba Morsalin"
    })
});

app.get("/api/v1/users", async (req : Request, res : Response) => {

    try {
        const result = await pool.query(`
        SELECT * FROM users
        `)

        if(result.rowCount === 0) {
               return res.status(404).json({
        success: false,
        message: "User not Found"
    })}

    res.status(200).json({
        success : true,
        message : "This is Express User Root Route",
        author : "Mezba Morsalin",
        data : result.rows
    })
    } catch (error : any) {
        res.status(500).json({
        success: false,
        message: error?.message,
        data: null
    })
    }
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

app.post("/api/v1/users", async (req: Request, res: Response) => {

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

app.listen(port, () => {
    console.log(`Express Server is running on the ${port}`);
})