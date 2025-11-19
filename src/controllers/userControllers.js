import { Router } from "express";
import models from "../models/index.js";

const router = Router();

router.get("/", async (req, res) => {

  let users = await models.User.findAll()
  
  return res.status(200).json(users)
});

router.get("/:userId", async (req, res) => {
  let id = req.params.userId
  let user = await models.User.findOne({
    where: {
      id: id
    }
  })

  if(user == null) return res.status(404).json({message: "Não encontrado"})

  return res.status(200).json(user)
});

router.put("/:userId", async(req, res) => {
  let id = req.params.userId
  
  let user = await models.User.findOne({
    where: {
      id: id
    }
  })

  if(!user) return res.status(404).json({message: "Não encontrado"})
  
  let {name, email} = req.body

  user.set({
    name: name ? name : user.name,
    email: email ? email : user.email,
    bio: bio ? bio : user.bio,
    avatar: avatar ? avatar : user.avatar
  })

  await user.save()

  return res.status(200).json(user)
});

router.delete("/:userId", async(req, res) => {
  
  let id = req.params.userId

  await models.User.destroy({
    where: {
      id: id
    }
  })

  return res.status(204).json();
});

export default router;