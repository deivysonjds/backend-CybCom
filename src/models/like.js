const getLikeModel = (sequelize, { DataTypes }) => {
  const Like = sequelize.define(
    "like",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "likes",
      timestamps: true,
    }
  );

  Like.associate = (models) => {
    Like.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });

    Like.belongsTo(models.Post, {
      foreignKey: "postId",
      as: "post",
    });
  };

  return Like;
};

export default getLikeModel;
