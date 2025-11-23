module.exports = (sequelize, DataTypes) => {
  const PostMedia = sequelize.define('PostMedia', {
    id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    postId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    mediaId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    order: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 }
  }, {
    tableName: 'post_media',
    underscored: true,
  });

  return PostMedia;
};
