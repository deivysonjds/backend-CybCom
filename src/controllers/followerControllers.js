import { Router } from "express";
import { followUser, unfollowUser } from "../service/followerService.js";
import models from "../models/index.js";

const router = Router();

// Rota 1: Seguir um usuário (POST /follower/:followingId)
router.post("/:followingId", async (req, res) => {
    // req.user.id é o ID do usuário que está logado (o seguidor), fornecido pelo authMiddleware
    const followerId = req.user.id; 
    const followingId = req.params.followingId;

    try {
        const result = await followUser(followerId, followingId);
        return res.status(201).json(result);
    } catch (error) {
        // Erro 400: Usuário tentando seguir a si mesmo, ou já seguindo
        return res.status(400).json({ message: error.message });
    }
});

// Rota 2: Deixar de seguir um usuário (DELETE /follower/:followingId)
router.delete("/:followingId", async (req, res) => {
    const followerId = req.user.id;
    const followingId = req.params.followingId;

    try {
        const result = await unfollowUser(followerId, followingId);
        return res.status(200).json(result);
    } catch (error) {
        // Erro 404: Relacionamento não encontrado para deletar
        return res.status(404).json({ message: error.message });
    }
});

// Rota 3: Listar quem um usuário específico está seguindo (GET /follower/following/:userId)
router.get("/following/:userId", async (req, res) => {
    try {
        const user = await models.User.findByPk(req.params.userId, {
            // Usa o alias 'Following' para buscar quem ele segue
            include: [{ 
                model: models.User, 
                as: 'Following', 
                attributes: ['id', 'name', 'avatar'],
                through: { attributes: [] } 
            }]
        });
        if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
        return res.status(200).json(user.Following);
    } catch (error) {
        return res.status(500).json({ message: "Erro interno: " + error.message });
    }
});

// Rota 4: Listar os seguidores de um usuário específico (GET /follower/followers/:userId)
// ESSA ERA A ROTA FALTANTE!
router.get("/followers/:userId", async (req, res) => {
    try {
        const user = await models.User.findByPk(req.params.userId, {
            // Usa o alias 'Followers' para buscar quem o segue
            include: [{ 
                model: models.User, 
                as: 'Followers', 
                attributes: ['id', 'name', 'avatar'],
                through: { attributes: [] }
            }]
        });
        if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
        return res.status(200).json(user.Followers);
    } catch (error) {
        return res.status(500).json({ message: "Erro interno: " + error.message });
    }
});


export default router;