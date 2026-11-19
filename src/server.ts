import express, { type Request, type Response } from 'express';

const app = express()

const port = 5000


app.get("/", (req : Request, res : Response) => {
    res.status(200).json({
        success : true,
        message : "This Express Root Route",
        author : "Mezba Morsalin"
    })
});

app.listen(port, () => {
    console.log(`Express Server is running on the ${port}`);
})