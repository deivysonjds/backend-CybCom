import Sequelize from "sequelize";
import pg from "pg";
import getUserModel from "./user.js";
import getNotificationModel from "./notification.js";
import getTokensModel from "./token.js";
import getFollowerModel from "./follower.js";
import "dotenv/config";
import getCommentModel from "./comment.js";
import getPostModel from "./post.js";
import getCategoryModel from "./category.js";
import getLikeModel from "./like.js";

//POSTGRES_URL
const sequelize = new Sequelize(process.env.POSTEGRES_URL, {
  dialect: "postgres",
  protocol: "postgres",
  // logging: false, // Disable SQL query logging
  dialectOptions: {
    // Necessary for SSL on NeonDB, Render.com and other providers
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 60000,
    idle: 20000
  },
  dialectModule: pg,
  logging: console.log,
});

const models = {
  Token: getTokensModel(sequelize, Sequelize),
  User: getUserModel(sequelize, Sequelize),
  Notification: getNotificationModel(sequelize, Sequelize),
  Follower: getFollowerModel(sequelize, Sequelize),
  Comment: getCommentModel(sequelize, Sequelize),
  Post: getPostModel(sequelize, Sequelize),
  Category: getCategoryModel(sequelize, Sequelize),
  Like: getLikeModel(sequelize, Sequelize)
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
