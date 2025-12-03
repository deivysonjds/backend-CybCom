import { Router } from "express";
import models from "../models/index.js";
import argon2, { argon2id } from "argon2"

const router = Router()

router.post("/signup", async (req, res) => {
    try {
        const { email, password, username } = req.body

        // 1. Validação mais completa
        if (!email || !password || !username) {
            return res.status(400).json({ message: "Preencha todos os campos (Nome, Email e Senha)!" })
        }

        // 2. Verifica se usuário já existe antes de tentar criar
        const userExists = await models.User.findOne({ where: { email } });
        if (userExists) {
            return res.status(409).json({ message: "Este email já está cadastrado." });
        }

        let senhaHash = await argon2.hash(password, {
            type: argon2id,
            secret: Buffer.from(process.env.PEPPER_SECRET)
        })

        let user = {
            email: email,
            password: senhaHash,
            name: username // Mapeia username do front para name do banco
        }

        let newUser = await models.User.create(user)

        return res.status(201).json(newUser);

    } catch (error) {
        console.error("Erro no cadastro:", error);
        // Retorna erro 400 ou 500 dependendo do tipo
        return res.status(400).json({ 
            message: "Erro ao criar conta. Verifique os dados ou tente outro email." 
        });
    }
})

export default router