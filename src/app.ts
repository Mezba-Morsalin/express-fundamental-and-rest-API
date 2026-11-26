import express, { type Application, type Request, type Response } from 'express';
import { userRoute } from './modules/users/user.route';
import { profileRoute } from './modules/profiles/profile.route';
import { authRouter } from './modules/auth/auth.route';
import logger from './middleware/logger';

const app : Application = express()

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded())
app.use(logger);

app.get("/", (req : Request, res : Response) => {
    res.status(200).json({
        success : true,
        message : "This is Express Root Route",
        author : "Mezba Morsalin"
    })
});


app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});



app.use("/api/v1/users", userRoute)

app.use("/api/v1/profiles", profileRoute)

app.use("/api/v1/auth", authRouter)

export default app