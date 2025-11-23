import { Router } from "express";
import { followUser, unfollowUser } from "../service/followerService.js";
import models from "../models/index.js";

const router = Router();

// Rota para seguir um usuário
router.post("/:followingId", async (req, res) => {
    // req.user.id é o ID do usuário que está logado (o seguidor)
    const followerId = req.user.id; 
    const followingId = req.params.followingId;

    try {
        const result = await followUser(followerId, followingId);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

// Rota para deixar de seguir um usuário
router.delete("/:followingId", async (req, res) => {
    const followerId = req.user.id;
    const followingId = req.params.followingId;

    try {
        const result = await unfollowUser(followerId, followingId);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
});

// Listar quem um usuário específico está seguindo (Following)
router.get("/following/:userId", async (req, res) => {
    const user = await models.User.findByPk(req.params.userId, {
        include: [{ 
            model: models.User, 
            as: 'Following', 
            attributes: ['id', 'name', 'avatar'],
            through: { attributes: [] } // Não retorna os campos da tabela de junção
        }]
    });
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
    return res.status(200).json(user.Following);
});


export default router;