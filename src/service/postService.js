import models from '../models/index.js';

const PostService = {

    // POST
    createPost: async (postData) => {
        // Verifica se a categoria existe antes de criar o post
        const categoryExists = await models.Category.findByPk(postData.categoryId);
        if (!categoryExists) {
            throw new Error('Category not found.');
        }

        // Cria o post
        const newPost = await models.Post.create(postData);
        return newPost;
    },

    // GET (Detalhe)
    getPostById: async (id) => {
        const post = await models.Post.findByPk(id, {
            include: [
                {
                    model: models.User,
                    as: 'user', // Alias definido no models/post.js
                    attributes: ['id', 'name', 'email', 'avatar'] // Retorna apenas dados seguros
                },
                {
                    model: models.Category,
                    as: 'category',
                    attributes: ['id', 'name']
                }
            ]
        });

        return post;
    },

    // GET (Lista)
    getAllPosts: async () => {
        const posts = await models.Post.findAll({
            order: [['createdAt', 'DESC']], // Ordena do mais recente para o mais antigo
            include: [
                {
                    model: models.User,
                    as: 'user',
                    attributes: ['id', 'name', 'username', 'avatar'] // Garanta que 'username' ou 'name' existam no seu model User
                },
                {
                    model: models.Category,
                    as: 'category',
                    attributes: ['id', 'name']
                },
                {
                    model: models.Like, // Para saber quantos likes tem (opcional, mas útil)
                    as: 'likes'
                }
            ]
        });
        return posts;
    },

    // PUT
    updatePost: async (id, updateData, userId) => {
        const post = await models.Post.findByPk(id);
        if (!post) {
            throw new Error('Post not found.');
        }

        // Validação de Autorização: Apenas o autor pode atualizar
        if (post.userId !== userId) {
            throw new Error('Unauthorized. Only the post author can update.');
        }

        // Se houver categoryId na atualização, valida se a categoria existe
        if (updateData.categoryId) {
            const categoryExists = await models.Category.findByPk(updateData.categoryId);
            if (!categoryExists) {
                throw new Error('Category not found.');
            }
        }

        await post.update(updateData);
        return post;
    },

    // DELETE
    deletePost: async (id, userId) => {
        const post = await models.Post.findByPk(id);
        if (!post) {
            throw new Error('Post not found.');
        }

        // Validação de Autorização: Apenas o autor pode deletar
        if (post.userId !== userId) {
            throw new Error('Unauthorized. Only the post author can delete.');
        }

        await post.destroy();
        return { message: 'Post deleted successfully.' };
    }
};

export default PostService;