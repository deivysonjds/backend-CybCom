import signIn from "./signin.js";
import signUp from "./signup.js";
import logout from "./logout.js";
import refresh from "./refresh.js"
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import isResourceOwner from '../middleware/resourceOwnerMiddleware.js'

const router = Router();

router.use("/auth", signIn);
router.use("/auth", signUp);
router.use("/auth",authMiddleware,isResourceOwner("users"),logout);
router.use("/auth",authMiddleware,isResourceOwner("users"),refresh);

export default router;