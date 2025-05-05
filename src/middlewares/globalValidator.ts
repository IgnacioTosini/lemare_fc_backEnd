import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
    let error = validationResult(req);
    if (!error.isEmpty()) {
        res.status(400).json({ error: error.array() });
        return;
    }
    next();
}