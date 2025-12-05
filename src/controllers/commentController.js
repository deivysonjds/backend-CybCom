import { Router } from "express";
import commentService from "../service/commentService.js";
import authMiddleware from "../middleware/authMiddleware.js"; // Aproveitando seu middleware existente

const router = Router();

// Criar comentário
router.post("/", async (req, res) => {
  try {
    // O authMiddleware popula req.user (geralmente com o ID do payload do token)
    const userId = req.user.id;
    const { postId, content } = req.body;

    const comment = await commentService.createComment(userId, postId, content);
    return res.status(201).json(comment);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Listar comentários de um post
router.get("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await commentService.getCommentsByPost(postId);
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Deletar comentário
router.delete("/:id", async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.user.id;

    await commentService.deleteComment(commentId, userId);
    return res.status(204).send(); // 204 No Content
  } catch (error) {
    // Diferenciar erro de "não encontrado/permissão" (403/404) de erro de servidor (500)
    // Para simplificar, retornamos 400 ou 403 aqui
    if (error.message.includes("permissão")) {
      return res.status(403).json({ error: error.message });
    }
    return res.status(400).json({ error: error.message });
  }
});

export default router;
