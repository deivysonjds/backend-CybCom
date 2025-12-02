import { Router } from "express";
import models from "../models/index.js";

const router = Router()

router.post("/signup", async (req, res)=>{
    const {email, password, name} = req.body
    if (!email || !password) {
        return res.status(400).json({message: "Email ou senha nulos!"})
    }

    await models.User.create({
        email: email,
        password: password,
        name: name
    })
    return res.status(201).json();
})

export default router