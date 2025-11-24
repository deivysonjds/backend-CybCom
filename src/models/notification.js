const getNotificationModel = (sequelize, { DataTypes }) => {
    const Notification = sequelize.define("notification", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            },
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        read: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });

    Notification.associate = (models) => {
        Notification.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user'
        });
    };

    return Notification;
};

export default getNotificationModel;
