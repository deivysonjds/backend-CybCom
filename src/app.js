import "dotenv/config";
import cors from "cors";
import express from "express";
import { sequelize } from "./models/index.js";
import authController from './auth/index.js'
import { 
	userController, 
	followerController, 
	commentController, 
	notificationController,
	postController,
	likeController,
	categoryController
} from "./controllers/index.js"
import authMiddleware from "./middleware/authMiddleware.js"
import seedDatabase from "./seed/seedDatabase.js";
const app = express();
app.set("trust proxy", true);

var corsOptions = {
  origin: ["http://localhost:3000", process.env.URL_FRONTEND],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Código para conseguir extrair o conteúdo do body da mensagem HTTP
// e armazenar na propriedade req.body (utiliza o body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
    res.status(200).json({message: "Server Ok!"})
})
app.use('/', authController)
app.use("/users",authMiddleware,userController)
app.use("/followers", authMiddleware, followerController)
app.use("/comments",authMiddleware, commentController);
app.use('/notifications',authMiddleware, notificationController)
app.use('/posts',authMiddleware, postController)
app.use('/likes',authMiddleware, likeController)
app.use('/categories',authMiddleware, categoryController)

let eraseDatabase = process.env.ERASE_DB === "true"

sequelize.sync({ force: eraseDatabase }).then(async () => {

  if(eraseDatabase){
    seedDatabase()
  }


  app.listen(8080, () => {
    console.log(`Server is running in http://localhost:8080`);
  });
});

export default app;
