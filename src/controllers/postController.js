import { Router } from "express";
import postService from '../service/postService.js'

const router = Router();

router.post("/",async (req, res)=> {
        try {
            const userId = req.user?.id || req.userId;

            const newPost = await postService.createPost({
                title: req.body.title,
                content: req.body.content,
                image_url: req.body.image_url,
                category_id: req.body.category_id,
                author_id: userId,
            });

            return res.status(201).json(newPost);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    })

router.get("/:id", async (req, res)=> {
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

router.put("/:id",async(req, res)=>{
        try {
            const userId = req.user?.id || req.userId;

            const updatedPost = await postService.updatePost(
                req.params.id,
                req.body,
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

router.delete("/:id",async(req, res)=>{
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