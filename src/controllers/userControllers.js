import { Router } from "express";
import models from "../models/index.js";

const router = Router();

router.get("/", async (req, res) => {
  const users = await models.User.findAll({
    attributes: { exclude: ["password"] }
  });

  return res.status(200).json(users);
});

router.get("/:userId", async (req, res) => {
  const id = req.params.userId;

  const user = await models.User.findOne({
    where: { id },
    attributes: { exclude: ["password"] }
  });

  if (!user) 
    return res.status(404).json({ message: "Não encontrado" });

  return res.status(200).json(user);
});

router.put("/:userId", async (req, res) => {
  const id = req.params.userId;

  const user = await models.User.findOne({ where: { id } });

  if (!user) 
    return res.status(404).json({ message: "Não encontrado" });

  const { name, email, bio, avatar } = req.body;

  user.set({
    name: name ?? user.name,
    email: email ?? user.email,
    bio: bio ?? user.bio,
    avatar: avatar ?? user.avatar,
  });

  await user.save();

  const userData = user.toJSON();
  delete userData.password;

  return res.status(200).json(userData);
});

router.delete("/:userId", async (req, res) => {
  const id = req.params.userId;

  await models.User.destroy({ where: { id } });

  return res.status(204).json();
});

export default router;
