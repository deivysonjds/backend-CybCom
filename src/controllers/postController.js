import PostService from "../services/PostService.js";

class PostController {

    async create(req, res) {
        try {
            const userId = req.userId; // assumindo que o auth middleware injeta userId
            const post = await PostService.createPost(req.body, userId);
            return res.status(201).json(post);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const post = await PostService.getPostById(id);
            return res.json(post);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }

    async index(req, res) {
        try {
            const posts = await PostService.getAllPosts();
            return res.json(posts);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const userId = req.userId;

            const updatedPost = await PostService.updatePost(id, req.body, userId);
            return res.json(updatedPost);

        } catch (error) {
            if (error.message.includes("Unauthorized")) {
                return res.status(403).json({ error: error.message });
            }
            return res.status(404).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const userId = req.userId;

            const result = await PostService.deletePost(id, userId);
            return res.json(result);

        } catch (error) {
            if (error.message.includes("Unauthorized")) {
                return res.status(403).json({ error: error.message });
            }
            return res.status(404).json({ error: error.message });
        }
    }
}

export default new PostController();