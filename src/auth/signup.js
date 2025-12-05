import { Router } from "express";
import models from "../models/index.js";

const router = Router();

router.post("/signup", async (req, res) => {
    try {
        let { email, password, username } = req.body;

        // Limpeza de espaços (boa prática)
        if (email) email = email.trim();
        if (username) username = username.trim();

        // 1. Validação básica
        if (!email || !password || !username) {
            return res.status(400).json({ message: "Preencha todos os campos!" });
        }

        // 2. Verificações de duplicidade (Melhora a mensagem de erro pro usuário)
        const userByEmail = await models.User.findOne({ where: { email } });
        if (userByEmail) {
            return res.status(409).json({ message: "Este email já está cadastrado." });
        }

        const userByName = await models.User.findOne({ where: { name: username } });
        if (userByName) {
            return res.status(409).json({ message: "Este nome de usuário já está em uso." });
        }

        // 3. CRIAÇÃO (Passando senha PURA)
        // O Model User.js vai pegar esse 'password' e fazer o hash no beforeCreate.
        let newUser = await models.User.create({
            email: email,
            password: password, 
            name: username
        });

        return res.status(201).json(newUser);

    } catch (error) {
        console.error("Erro no cadastro:", error);
        
        // Fallback: Se passar pelas verificações acima e o banco chiar
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: "Usuário ou Email já existem." });
        }

        return res.status(500).json({ message: "Erro interno: " + error.message });
    }
});

export default router;