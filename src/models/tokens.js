
const getTokensModel = (sequelize, { DataTypes }) => {
  const Token = sequelize.define("token", {
    tokenId: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    }

  });

  return Token;
};

export default getTokensModel;