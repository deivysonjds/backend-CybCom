const getFollowerModel = (sequelize, { DataTypes }) => {
  const Follower = sequelize.define("follower", {
    // Identificador único para cada entrada de seguidor
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      autoIncrement: true, 
      allowNull: false,
    },
    // Chave estrangeira para o usuário que está seguindo (o seguidor)
    followerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users", 
        key: "id", 
      },
      onDelete: "CASCADE", // Se o usuário for deletado, a entrada de seguidor é deletada
    },
    // Chave estrangeira para o usuário que está sendo seguido (o seguindo)
    followingId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users", // Referencia a tabela 'users'
        key: "id", // Referencia a coluna 'id' em 'users'
      },
      onDelete: "CASCADE", // Se o usuário for deletado, a entrada de seguidor é deletada
    },
  }, {
    // Adiciona um índice único para garantir que um usuário não possa seguir outro mais de uma vez
    indexes: [
      {
        unique: true,
        fields: ['followerId', 'followingId']
      }
    ]
  });

  Follower.associate = (models) => {
    
  };

  return Follower;
};

export default getFollowerModel;