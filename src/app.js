import "dotenv/config";
import cors from "cors";
import express from "express";
import { sequelize } from "./models/index.js";
import { userController } from "./controllers/index.js";
const app = express();
app.set("trust proxy", true);

var corsOptions = {
  origin: ["http://example.com", "*"],
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

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server Ok!" });
});

app.use("/user", userController);
app.use("/comments", commentController);

sequelize.sync({ force: true }).then(async () => {
  app.listen(8080, () => {
    console.log(`Server is running in http://localhost:8080`);
  });
});

export default app;
