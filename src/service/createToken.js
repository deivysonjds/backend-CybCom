import "dotenv/config";
import { v4 } from "uuid";
import models from "../models/index.js";
import jwt from "jsonwebtoken";

export default async function createToken(dados) {
  const id = v4();

  const token_acess = jwt.sign(dados, process.env.SECRET_ACESS, { expiresIn: process.env.SECRET_ACESS_EXPIRES });

  const token_refresh = jwt.sign({ id: id }, process.env.SECRET_REFRESH, { expiresIn: process.env.SECRET_REFRESH_EXPIRES });

  try {
    await models.Token.create({
      tokenId: id,
    });
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }

  return { refresh: token_refresh, acess: token_acess };
}