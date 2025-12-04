import models from "../models/index.js";

class CommentService {
  async createComment(userId, postId, content) {
    if (!content) throw new Error("Conteúdo é obrigatório.");

    const userExists = await models.User.findByPk(userId); // Assumindo que User usa UUID
    if (!userExists) throw new Error("Usuário não encontrado.");

    const postExists = await models.Post.findByPk(postId);
    if (!postExists) throw new Error("Post não encontrado.");

    const newComment = await models.Comment.create({
      userId,
      postId,
      content,
    });

    return newComment;
  }

  async getCommentsByPost(postId) {
    return await models.Comment.findAll({
      where: { postId },
      include: [
        {
          model: models.User,
          as: "user",
          attributes: ["id", "name", "avatar"], 
        },
      ],
      order: [["createdAt", "ASC"]], 
    });
  }

  async deleteComment(commentId, userIdFromToken) {
    const comment = await models.Comment.findByPk(commentId);

    if (!comment) throw new Error("Comentário não encontrado.");

    if (comment.userId !== userIdFromToken) {
      throw new Error("Você não tem permissão para deletar este comentário.");
    }

    await comment.destroy();
    return true;
  }
}

export default new CommentService();
