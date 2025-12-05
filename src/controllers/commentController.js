import { Router } from "express";
import commentService from "../service/commentService.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    // O authMiddleware popula req.user (geralmente com o ID do payload do token)
    const userId = req.user;
    const { postId, content } = req.body;

    const comment = await commentService.createComment(userId, postId, content);
    return res.status(201).json(comment);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const comments = await commentService.getAllComments();

    if (!comments || comments.length === 0) {
      return res.status(404).json({ message: "Nenhum comentário encontrado" });
    }

    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


router.get("/post/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await commentService.getCommentsByPost(postId);
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.user.id;

    await commentService.deleteComment(commentId, userId);
    return res.status(204).send(); // 204 No Content
  } catch (error) {
    if (error.message.includes("permissão")) {
      return res.status(403).json({ error: error.message });
    }
    return res.status(400).json({ error: error.message });
  }
});

export default router;
