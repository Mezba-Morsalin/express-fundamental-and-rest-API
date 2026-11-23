import express, { type Application, type Request, type Response } from 'express';



import fs from "fs"
import { userRoute } from './modules/users/user.route';
import { profileRoute } from './modules/profiles/profile.route';
import { authRouter } from './modules/auth/auth.route';

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

app.use((req, res, next) => {
//   console.log('Time:', Date.now());

const log = `\nMethod : ${req.method} | url : ${req.url} | Time : ${Date.now()}\n`

fs.appendFile("logger.txt", log, (err) => {
    console.log(err);
})
  next();
});


app.use("/api/v1/users", userRoute)

app.use("/api/v1/profiles", profileRoute)

app.use("/api/v1/auth", authRouter)

export default app