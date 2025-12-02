// src/models/Post.js

const getPostModel = (sequelize, { DataTypes }) => {
    const Post = sequelize.define('Post', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        content: {
            // Geralmente usamos TEXT para conteúdo longo
            type: DataTypes.TEXT,
            allowNull: false,
        },
        imagUrl: {
            type: DataTypes.STRING,
            allowNull: true, // Opcional
        },
        // Chave Estrangeira para o Autor (uuid)
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        // Chave Estrangeira para a Categoria (int)
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // O Sequelize adiciona createdAt e updatedAt por padrão
    }, {
        tableName: 'posts',
        // Outras configurações do modelo
    });

    // Definição das Associações (Relacionamentos)
    Post.associate = (models) => {
        // Um Post pertence a um Autor (User)
        Post.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });

        // Um Post pertence a uma Categoria
        Post.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });

        Post.hasMany(models.Like, { foreignKey: 'postId', as: 'likes' });
    };

    return Post;
};

export default getPostModel;