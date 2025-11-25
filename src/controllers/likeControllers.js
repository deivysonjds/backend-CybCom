import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import likeService from "../services/likeService.js";

const router = Router();

/**
 * Alternar like (curtir / descurtir)
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId } = req.body;

    const result = await likeService.toggleLike(userId, postId);

    return res.status(200).json(result); // { liked: true/false }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

/**
 * Contar likes de um post
 */
router.get("/post/:postId", async (req, res) => {
  try {
    const { postId } = req.params;

    const count = await likeService.countLikes(postId);

    return res.status(200).json({ postId, likes: count });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default router;
