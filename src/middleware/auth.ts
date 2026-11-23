import type { NextFunction, Request, Response } from "express";

const auth = async (req : Request, res : Response, next :NextFunction) => {
    console.log("this is protected route");

    next()
}

export default auth