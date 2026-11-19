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

console.log(pool);


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