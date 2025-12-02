import { Router } from "express";
import postService from '../service/postService.js'
import isResourceOwner from '../middleware/resourceOwnerMiddleware.js'

const router = Router();

router.post("/", async (req, res) => {
    try {
        const userId = req.user.id

        const newPost = await postService.createPost({
            title: req.body.title,
            content: req.body.content,
            image_url: req.body.image_url,
            categoryId: req.body.categoryId,
            userId: userId,
        });

        return res.status(201).json(newPost);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
})

router.get("/:id", isResourceOwner('posts'), async (req, res) => {
    try {
        const post = await postService.getPostById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        return res.json(post);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

router.get("/", async (req, res) => {
    try {
        const posts = await postService.getAllPosts(); 
        return res.json(posts);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.put("/:id", isResourceOwner('posts'), async (req, res) => {
    try {
        const userId = req.user?.id || req.userId;

        const updatedPost = await postService.updatePost(
            req.params.id,
            { ...req.body, categoryId: req.body.categoryId },
            userId
        );

        return res.json(updatedPost);
    } catch (error) {
        if (error.message === 'Post not found.') {
            return res.status(404).json({ error: error.message });
        }

        if (error.message === 'Category not found.') {
            return res.status(400).json({ error: error.message });
        }

        return res.status(500).json({ error: error.message });
    }
})

router.delete("/:id", isResourceOwner('posts'), async (req, res) => {
    try {
        const userId = req.user?.id || req.userId;

        const result = await postService.deletePost(req.params.id, userId);

        return res.json(result);
    } catch (error) {
        if (error.message === 'Post not found.') {
            return res.status(404).json({ error: error.message });
        }

        return res.status(500).json({ error: error.message });
    }
})

export default router;