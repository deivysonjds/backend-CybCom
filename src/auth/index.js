import signIn from "./signin.js";
import signUp from "./signup.js";
import logout from "./logout.js";
import refresh from "./refresh.js"
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import isResourceOwner from '../middleware/resourceOwnerMiddleware.js'
import validate from "./validate.js";

const router = Router();

router.use("/auth", signIn);
router.use("/auth", signUp);
router.use("/auth", validate)
router.use("/auth",authMiddleware,isResourceOwner("User"),logout);
router.use("/auth",authMiddleware,isResourceOwner("User"),refresh);

export default router;