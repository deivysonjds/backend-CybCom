import models from "../models/index.js";
import createToken from "../service/createToken.js";
import { Router } from "express";
import argon2d from "argon2";
import "dotenv/config"

const router = Router();

router.post("/signin", async (req, res) => {
    const { email, senha } = req.body;

    try {
        let user = await models.User.findByLogin(email);

        if (!user) {
            return res.status(404).json({ message: "credenciais inválidas" });
        }

        let isValid = await argon2d.verify(user.senha, senha, {
            secret: Buffer.from(process.env.PEPPER_SECRET)
        });

        if (!isValid) {
            return res.status(401).json({ message: "credenciais inválidas" });
        }

        let tokens = await createToken({ id: user.id });

        return res.status(200).json(tokens);
    } catch (error) {
        return res.status(500).json({ message: "Erro interno no servidor : " +error.message});
    }
});

export default router;