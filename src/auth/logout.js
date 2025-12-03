import { Router } from "express";
import jwt from "jsonwebtoken"; 
import models from "../models/index.js";
import "dotenv/config"

const router = Router();

router.post("/logout", async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    
    if (!token) {
        return res.status(401).json({ message: 'não autorizado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_REFRESH); 
        const id = decoded.id;  
        console.log(id)
        await models.Token.destroy({
            where: {
                tokenId: id
            }
        }) 

        return res.status(200).json();
    } catch (err) {
        return res.status(403).json({ message: 'não autorizado:'+ err.message });
    }
});

export default router;