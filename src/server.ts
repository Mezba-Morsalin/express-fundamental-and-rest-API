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
            email VARCHAR (255) NOT NULL,
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

app.get("/users", (req : Request, res : Response) => {
    res.status(200).json({
        success : true,
        message : "This is Express User Root Route",
        author : "Mezba Morsalin"
    })
});


app.post("/users", (req : Request, res : Response) => {

    const {name , age} = req.body

    res.status(201).json({
        success : true,
        message : "User Created Successfully",
        author : "Mezba Morsalin",
        data : {
            name,
            age
        }
    })
})

app.listen(port, () => {
    console.log(`Express Server is running on the ${port}`);
})