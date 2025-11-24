import { Router } from "express";
import models from "../models/index.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();
const Category = models.Category; 

router.get("/", async (req, res) => {
    try {
        const categories = await Category.findAll();
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ message: "Erro interno ao buscar categorias: " + error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Categoria não encontrada" });
        }
        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json({ message: "Erro interno ao buscar categoria: " + error.message });
    }
});

router.post("/", authMiddleware, async (req, res) => {
    try {
        const { name, slug, description } = req.body;
        
        if (!name) {
             return res.status(400).json({ message: "O nome da categoria é obrigatório." });
        }
        
        const newCategory = await Category.create({ name, slug, description });
        
        return res.status(201).json(newCategory);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: "Erro: Nome ou Slug da categoria já existe." });
        }
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: "Erro de validação: " + error.message });
        }
        return res.status(500).json({ message: "Erro interno ao criar categoria: " + error.message });
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { name, slug, description } = req.body;
        const category = await Category.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({ message: "Categoria não encontrada" });
        }
        
        category.name = name ?? category.name;
        category.slug = slug ?? category.slug;
        category.description = description ?? category.description;
        
        await category.save();

        return res.status(200).json(category);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: "Erro: Nome ou Slug da categoria já existe." });
        }
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: "Erro de validação: " + error.message });
        }
        return res.status(500).json({ message: "Erro interno ao atualizar categoria: " + error.message });
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const result = await Category.destroy({
            where: { id: req.params.id },
        });

        if (result === 0) {
            return res.status(404).json({ message: "Categoria não encontrada" });
        }

        return res.status(204).send(); 
    } catch (error) {
        return res.status(500).json({ message: "Erro interno ao deletar categoria: " + error.message });
    }
});

export default router;