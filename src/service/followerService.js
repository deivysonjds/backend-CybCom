import models from "../models/index.js";

export async function followUser(followerId, followingId) {
    if (followerId === followingId) {
        throw new Error("Usuário não pode seguir a si mesmo.");
    }
    
    // Verifica se já segue
    const existingFollow = await models.Follower.findOne({
        where: { follower_id: followerId, following_id: followingId }
    });

    if (existingFollow) {
        return { message: "Já está seguindo" };
    }

    await models.Follower.create({
        follower_id: followerId,
        following_id: followingId
    });

    return { message: "Seguindo com sucesso" };
}

export async function unfollowUser(followerId, followingId) {
    const deleted = await models.Follower.destroy({
        where: { follower_id: followerId, following_id: followingId }
    });

    if (deleted === 0) {
        throw new Error("Não está seguindo este usuário.");
    }

    return { message: "Deixou de seguir com sucesso" };
}