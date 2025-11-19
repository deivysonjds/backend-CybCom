import { Router } from "express";
import jwt from "jsonwebtoken";  // Importando o JWT

const router = Router();

router.post("/refresh", async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'não autorizado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_REFRESH); 
        const id = decoded.id;  

        const token_acess = jwt.sign({id: id}, process.env.SECRET_ACESS, { expiresIn: process.env.SECRET_ACESS_EXPIRES }); 

        return res.status(200).json({ acess: token_acess });
    } catch (err) {
        return res.status(403).json({ error: 'não autorizado' });
    }
});

export default router;