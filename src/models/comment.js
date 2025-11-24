const getCommentModel = (sequelize, { DataTypes }) => {
  const Comment = sequelize.define(
    "comment",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty,
          len: [1, 500],
        },
      },

      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "post_id",
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "user_id",
      },
    },
    {
      tableName: "comments", // Força o nome da tabela conforme diagrama
      timestamps: true, // Cria createdAt e updatedAt automaticamente (boa prática)
    }
  );

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: "userId",
      as: "author",
    });

    Comment.belongsTo(models.Post, {
      foreignKey: "postId",
      as: "post",
    });
  };

  return Comment;
};

export default getCommentModel;
