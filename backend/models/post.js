module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    createdById: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    content: { type: DataTypes.TEXT },
    isPublished: { type: DataTypes.BOOLEAN, defaultValue: false },
    scheduledAt: { type: DataTypes.DATE, allowNull: true }, // for scheduled posts
    publishedAt: { type: DataTypes.DATE, allowNull: true },
    visibility: { type: DataTypes.ENUM('PRIVATE','GROUP','ALL_STUDENTS','ADMINS_ONLY'), defaultValue: 'GROUP' },
    allowDownload: { type: DataTypes.BOOLEAN, defaultValue: false },
    featuredOnHome: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    tableName: 'posts',
    underscored: true,
    paranoid: true,
    indexes: [{ fields: ['created_by_id'] }, { fields: ['scheduled_at'] }]
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User, { foreignKey: 'createdById', as: 'author' });

    // many-to-many Post <-> Media (attachments)
    Post.belongsToMany(models.Media, { through: models.PostMedia, foreignKey: 'postId', otherKey: 'mediaId', as: 'media' });

    // comments & likes (polymorphic)
    Post.hasMany(models.Comment, { foreignKey: 'targetId', constraints: false, scope: { targetType: 'Post' }, as: 'comments' });
    Post.hasMany(models.Like, { foreignKey: 'targetId', constraints: false, scope: { targetType: 'Post' }, as: 'likes' });
  };

  return Post;
};
