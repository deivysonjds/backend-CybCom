import { Router } from "express";
import models from "../models/index.js";
import argon2, { argon2id } from "argon2"

const router = Router()

router.post("/signup", async (req, res) => {
    try {
        const { email, password, username } = req.body

        // 1. Validação de campos vazios
        if (!email || !password || !username) {
            return res.status(400).json({ message: "Preencha todos os campos (Nome, Email e Senha)!" })
        }

        // 2. VERIFICAÇÃO DE EMAIL (Já existia)
        const userByEmail = await models.User.findOne({ where: { email } });
        if (userByEmail) {
            return res.status(409).json({ message: "Este email já está cadastrado." });
        }

        // 3. VERIFICAÇÃO DE USERNAME (NOVO CORRIGIDO)
        // Precisamos verificar se o 'name' já existe no banco
        const userByName = await models.User.findOne({ where: { name: username } });
        if (userByName) {
            return res.status(409).json({ message: "Este nome de usuário já está em uso. Escolha outro." });
        }

        // 4. Criptografia
        let senhaHash = await argon2.hash(password, {
            type: argon2id,
            secret: Buffer.from(process.env.PEPPER_SECRET)
        })

        // 5. Criação
        let newUser = await models.User.create({
            email: email,
            password: senhaHash,
            name: username 
        })

        return res.status(201).json(newUser);

    } catch (error) {
        console.error("Erro no cadastro:", error);
        // Melhoria opcional: Se passar batido pelas verificações e o banco der erro,
        // verificamos se é erro de "Unique Constraint"
        if (error.name === 'SequelizeUniqueConstraintError') {
             return res.status(409).json({ message: "Usuário ou Email já existem." });
        }

        return res.status(400).json({ 
            message: "Erro ao criar conta. Tente novamente." 
        });
    }
})

export default router