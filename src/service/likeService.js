import db from "../models/index.js";

const { Like, Post } = db;

const likeService = {
  async toggleLike(userId, postId) {
    // Verifica se o like já existe
    const existing = await Like.findOne({
      where: { userId, postId },
    });

    if (existing) {
      await existing.destroy();
      return { liked: false };
    }

    // Verifica se o post existe
    const postExists = await Post.findByPk(postId);
    if (!postExists) {
      throw new Error("Post não encontrado");
    }

    // Cria o like
    await Like.create({ userId, postId });
    return { liked: true };
  },

  async countLikes(postId) {
    return await Like.count({
      where: { postId },
    });
  },
};

export default likeService;
