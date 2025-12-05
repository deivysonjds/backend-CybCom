import { Router } from "express";
import jwt from "jsonwebtoken";  // Importando o JWT

const router = Router();

router.post("/validate", async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'não autorizado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_ACESS); 

        return res.status(200).json();
    } catch (err) {
        return res.status(403).json();
    }
});

export default router;