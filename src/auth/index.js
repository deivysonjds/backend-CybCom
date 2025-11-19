import signIn from "./signin.js";
import signUp from "./signup.js";
import logout from "./logout.js";
import refresh from "./refresh.js"
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.use("/auth", signIn);
router.use("/auth", signUp);
router.use("/auth",authMiddleware ,logout);
router.use("/auth",refresh);

export default router;