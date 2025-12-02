
const getTokensModel = (sequelize, { DataTypes }) => {
  const Token = sequelize.define("token", {
    tokenId: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
    
  });
  Token.associate = (models)=>{
    Token.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
  }
  return Token;
};

export default getTokensModel;