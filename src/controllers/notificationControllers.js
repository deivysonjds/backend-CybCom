import { Router } from "express";
import models from "../models/index.js";

const router = Router();

// Create notification
router.post("/", async (req, res) => {
    try {
        const notification = await models.Notification.create(req.body);
        return res.status(201).json(notification);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao criar notificação", error });
    }
});

// List notifications by user
router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const notifications = await models.Notification.findAll({
            where: { user_id: userId },
        });
        return res.status(200).json(notifications);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar notificações", error });
    }
});

// Mark as read
router.put("/:id/read", async (req, res) => {
    const { id } = req.params;
    try {
        const notification = await models.Notification.findByPk(id);
        if (!notification) {
            return res.status(404).json({ message: "Notificação não encontrada" });
        }

        notification.read = true;
        await notification.save();

        return res.status(200).json(notification);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao atualizar notificação", error });
    }
});

// Delete notification
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await models.Notification.destroy({
            where: { id },
        });

        if (result === 0) {
            return res.status(404).json({ message: "Notificação não encontrada" });
        }

        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ message: "Erro ao deletar notificação", error });
    }
});

export default router;
