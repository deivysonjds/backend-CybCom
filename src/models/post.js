// src/models/Post.js

const getPostModel = (sequelize, {DataTypes}) => {
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
        image_url: {
            type: DataTypes.STRING,
            allowNull: true, // Opcional
        },
        // Chave Estrangeira para o Autor (uuid)
        author_id: { 
            type: DataTypes.UUID,
            allowNull: false,
            // Adicione a referência aqui se estiver configurando o modelo User
            // references: {
            //     model: 'Users', // Nome da tabela de usuários
            //     key: 'id',
            // }
        },
        // Chave Estrangeira para a Categoria (int)
        category_id: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            // references: {
            //     model: 'Categories', // Nome da tabela de categorias
            //     key: 'id',
            // }
        },
        // O Sequelize adiciona createdAt e updatedAt por padrão
    }, {
        tableName: 'posts',
        // Outras configurações do modelo
    });

    // Definição das Associações (Relacionamentos)
    Post.associate = (models) => {
        // Um Post pertence a um Autor (User)
        Post.belongsTo(models.User, { foreignKey: 'author_id', as: 'author' }); 
        
        // Um Post pertence a uma Categoria
        Post.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' }); 
    };

    return Post;
};

export default getPostModel;