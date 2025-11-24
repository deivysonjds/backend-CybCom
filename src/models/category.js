const getCategoryModel = (sequelize, { DataTypes }) => {
  const Category = sequelize.define(
    "category",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255), 
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          len: [1, 255],
        },
      },
      slug: {
        type: DataTypes.STRING(255), 
        allowNull: true,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT, 
        allowNull: true,
      },
    },
    {
      tableName: "categories",
      timestamps: true,
      paranoid: true, 
      indexes: [ 
        { fields: ['slug'], unique: true },
        { fields: ['name'], unique: true }
      ]
    }
  );

  const generateSlug = (category) => {
    if (!category.slug && category.name) {
        category.slug = category.name
            .toLowerCase()
            .normalize("NFD") 
            .replace(/[\u0300-\u036f]/g, "") 
            .trim()
            .replace(/\s+/g, "-") 
            .replace(/[^\w\-]+/g, "") 
            .replace(/\-\-+/g, "-"); 
    }
  };

  Category.beforeCreate(generateSlug);
  Category.beforeUpdate(generateSlug);

  Category.associate = (models) => {
  };

  return Category;
};

export default getCategoryModel;