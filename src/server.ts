import express, { type Application, type Request, type Response } from 'express';

import { userRoute } from './modules/users/user.route';
import { profileRoute } from './modules/profiles/profile.route';

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

app.use("/api/v1/profiles", profileRoute)

export default app