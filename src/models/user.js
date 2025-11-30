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
    bio: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    }
  });

  User.associate = (models) => {
    models.User.hasMany(models.Token, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    User.belongsToMany(models.User, {
      through: models.Follower,
      as: 'followers',
      foreignKey: 'followerId',
    });

    User.belongsToMany(models.User, {
      through: models.Follower,
      as: 'followers',
      foreignKey: 'followingId',
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