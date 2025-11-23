module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },

    // polymorphic target (Post or Media)
    targetType: { type: DataTypes.ENUM('Post','Media'), allowNull: false },
    targetId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },

    parentId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true }, // reply to another comment
    content: { type: DataTypes.TEXT, allowNull: false },

    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    moderatedById: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    moderatedAt: { type: DataTypes.DATE, allowNull: true },
  }, {
    tableName: 'comments',
    underscored: true,
    paranoid: true,
    indexes: [{ fields: ['user_id'] }, { fields: ['target_type','target_id'] }]
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, { foreignKey: 'userId', as: 'author' });

    Comment.belongsTo(models.Comment, { foreignKey: 'parentId', as: 'parent' });
    Comment.hasMany(models.Comment, { foreignKey: 'parentId', as: 'replies' });
  };

  return Comment;
};
