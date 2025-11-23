module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    targetType: { type: DataTypes.ENUM('Post','Media'), allowNull: false },
    targetId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  }, {
    tableName: 'likes',
    underscored: true,
    timestamps: true,
    indexes: [{ fields: ['user_id'] }, { fields: ['target_type','target_id'] }],
    uniqueKeys: {
      unique_like: {
        fields: ['user_id','target_type','target_id']
      }
    }
  });

  Like.associate = (models) => {
    Like.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Like;
};
