import argon2, { argon2id } from "argon2"
import "dotenv/config"
import { validate } from "uuid";

const getUserModel = (sequelize, { DataTypes }) => {
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkedin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    github: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  User.beforeCreate(async (user)=>{
    user.password = await argon2.hash(user.password, {
            type: argon2id,
            secret: Buffer.from(process.env.PEPPER_SECRET)
        })
  })
  User.associate = (models) => {
    models.User.hasMany(models.Token, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    User.belongsToMany(models.User, {
      through: models.Follower,
      as: 'followers',
      foreignKey: 'followingId',  
      otherKey: 'followerId',      
    });

    // Quem este usuário segue
    User.belongsToMany(models.User, {
      through: models.Follower,
      as: 'following',
      foreignKey: 'followerId',     
      otherKey: 'followingId',      
    });
  };

  User.findByLogin = async (login) => {
    let user = await User.findOne({
      where: { name: login },
    });

    if (!user) {
      user = await User.findOne({
        where: { email: login },
      });
    }

    return user;
  };

  return User;
};

export default getUserModel;