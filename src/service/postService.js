// src/service/postService.js
// Importe seus modelos. (Assumindo que eles são exportados via models/index.js)
import models from '../models/index.js'

const PostService = {

    // 1. Lógica para CRIAR um post
    createPost: async (postData)=> {
        // ... (Implementação da validação de Author e Category e criação do Post)
        // ... (Código já fornecido na minha resposta anterior)
    },

    // 2. Lógica para LER (Detalhe) um post
    getPostById: async(id)=> {
        // ... (Implementação da busca do Post com JOINs para Author e Category)
        // ... (Código já fornecido na minha resposta anterior)
    },
    
    // 3. Lógica para ATUALIZAR um post (Novo)
    updatePost: async(id, updateData, userId) =>{
        const post = await models.Post.findByPk(id);
        if (!post) {
            throw new Error('Post not found.');
        }

        // Validação de Autorização: Apenas o autor pode atualizar o post
        if (post.author_id !== userId) {
            throw new Error('Unauthorized. Only the post author can update.');
        }

        // Se houver category_id na atualização, valide se a categoria existe.
        if (updateData.category_id) {
             const categoryExists = await models.Category.findByPk(updateData.category_id);
             if (!categoryExists) {
                throw new Error('Category not found.');
             }
        }

        await post.update(updateData);
        return post;
    },

    // 4. Lógica para DELETAR um post (Novo)
    deletePost: async(id, userId)=>{
        const post = await models.Post.findByPk(id);
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

export default PostService