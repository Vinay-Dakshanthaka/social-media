module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    type: { type: DataTypes.STRING(100) }, // e.g., "UPLOAD", "LIKE", "COMMENT"
    payload: { type: DataTypes.JSON },
    isRead: { type: DataTypes.BOOLEAN, defaultValue: false },
    deliveredAt: { type: DataTypes.DATE, allowNull: true }
  }, {
    tableName: 'notifications',
    underscored: true,
    timestamps: true,
  });

  Notification.associate = (models) => {
    Notification.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Notification;
};
