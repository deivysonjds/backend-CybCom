// src/service/postService.js
// Importe seus modelos. (Assumindo que eles são exportados via models/index.js)
const { Post, User, Category } = require('../models'); 
const { Op } = require('sequelize'); // Útil para filtros, se usar Sequelize

class PostService {

    // 1. Lógica para CRIAR um post
    async createPost(postData) {
        // ... (Implementação da validação de Author e Category e criação do Post)
        // ... (Código já fornecido na minha resposta anterior)
    }

    // 2. Lógica para LER (Detalhe) um post
    async getPostById(id) {
        // ... (Implementação da busca do Post com JOINs para Author e Category)
        // ... (Código já fornecido na minha resposta anterior)
    }
    
    // 3. Lógica para ATUALIZAR um post (Novo)
    async updatePost(id, updateData, userId) {
        const post = await Post.findByPk(id);
        if (!post) {
            throw new Error('Post not found.');
        }

        // Validação de Autorização: Apenas o autor pode atualizar o post
        if (post.author_id !== userId) {
            throw new Error('Unauthorized. Only the post author can update.');
        }

        // Se houver category_id na atualização, valide se a categoria existe.
        if (updateData.category_id) {
             const categoryExists = await Category.findByPk(updateData.category_id);
             if (!categoryExists) {
                throw new Error('Category not found.');
             }
        }

        await post.update(updateData);
        return post;
    }

    // 4. Lógica para DELETAR um post (Novo)
    async deletePost(id, userId) {
        const post = await Post.findByPk(id);
        if (!post) {
            throw new Error('Post not found.');
        }
        
        // Validação de Autorização: Apenas o autor pode deletar o post
        if (post.author_id !== userId) {
            throw new Error('Unauthorized. Only the post author can delete.');
        }

        await post.destroy();
        return { message: 'Post deleted successfully.' };
    }

    // Você também pode adicionar a lógica de listar todos os posts (getAllPosts) aqui.
}

module.exports = new PostService();