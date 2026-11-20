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

// app.get("/api/v1/users", (req : Request, res : Response) => {
//     res.status(200).json({
//         success : true,
//         message : "This is Express User Root Route",
//         author : "Mezba Morsalin"
//     })
// });


app.post("/api/v1/users", async (req : Request, res : Response) => {
        try {
            const {name , email, password ,age} = req.body

        const result = await pool.query(`
            INSERT INTO users (name, email, password, age) VALUES
            ($1, $2, $3, $4) RETURNING *
            `,[name , email, password ,age]);

            // console.log(result);

    res.status(201).json({
        success : true,
        message : "User Created Successfully",
        author : "Mezba Morsalin",
        data : result.rows[0]
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
    
})

app.listen(port, () => {
    console.log(`Express Server is running on the ${port}`);
})