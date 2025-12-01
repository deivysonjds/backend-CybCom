import { Router } from "express";
import models from "../models/index.js";
import argon2, { argon2id } from "argon2"

const router = Router()

router.post("/signup", async (req, res) => {
    const { email, password, username } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "Email ou senha nulos!" })
    }

    let senhaHash = await argon2.hash(password, {
        type: argon2id,
        secret: Buffer.from(process.env.PEPPER_SECRET)
    })

    let user = {
        email: email,
        password: senhaHash,
        name: username
    }

    let newUser = await models.User.create(user)

    return res.status(201).json(newUser);
})

export default router