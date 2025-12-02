
const { Post, User, Category } = require('../models'); 
const { Op } = require('sequelize'); // Útil para filtros, se usar Sequelize

class PostService {

   
    async createPost(postData) {
        
    }

  
    async getPostById(id) {
       
    }
    
   
    async updatePost(id, updateData, userId) {
        const post = await Post.findByPk(id);
        if (!post) {
            throw new Error('Post not found.');
        }

        
        if (post.author_id !== userId) {
            throw new Error('Unauthorized. Only the post author can update.');
        }

       
        if (updateData.category_id) {
             const categoryExists = await Category.findByPk(updateData.category_id);
             if (!categoryExists) {
                throw new Error('Category not found.');
             }
        }

        await post.update(updateData);
        return post;
    }

    async deletePost(id, userId) {
        const post = await Post.findByPk(id);
        if (!post) {
            throw new Error('Post not found.');
        }
        
        if (post.author_id !== userId) {
            throw new Error('Unauthorized. Only the post author can delete.');
        }

        await post.destroy();
        return { message: 'Post deleted successfully.' };
    }

   
}

module.exports = new PostService();