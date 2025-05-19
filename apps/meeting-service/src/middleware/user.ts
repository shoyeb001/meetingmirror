import { NextFunction, Response } from "express";
export async function user(req: any, res: Response, next: NextFunction) {
    try {
        const user = req.session?.passport?.user;
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}