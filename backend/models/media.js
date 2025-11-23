module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define('Media', {
    id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },

    albumId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    uploadedById: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },

    type: { type: DataTypes.ENUM('PHOTO','VIDEO'), allowNull: false },
    fileUrl: { type: DataTypes.STRING(2048), allowNull: false },       // S3 URL
    thumbnailUrl: { type: DataTypes.STRING(2048) },
    fileName: { type: DataTypes.STRING(500) },
    mimeType: { type: DataTypes.STRING(100) },
    size: { type: DataTypes.BIGINT.UNSIGNED },

    caption: { type: DataTypes.TEXT },
    tags: { type: DataTypes.JSON }, // array of tags: ["farewell","2025"]

    isFeatured: { type: DataTypes.BOOLEAN, defaultValue: false }, // photo-level featured
    visibility: { type: DataTypes.ENUM('PRIVATE','GROUP','ALL_STUDENTS','ADMINS_ONLY'), defaultValue: 'GROUP' },
    allowDownload: { type: DataTypes.BOOLEAN, defaultValue: false },

    // moderation
    isApproved: { type: DataTypes.BOOLEAN, defaultValue: true },
    moderatedById: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    moderatedAt: { type: DataTypes.DATE, allowNull: true },

  }, {
    tableName: 'media',
    underscored: true,
    paranoid: true,
    indexes: [{ fields: ['album_id'] }, { fields: ['uploaded_by_id'] }]
  });

  Media.associate = (models) => {
    Media.belongsTo(models.Album, { foreignKey: 'albumId', as: 'album' });
    Media.belongsTo(models.User, { foreignKey: 'uploadedById', as: 'uploader' });

    // moderation reference
    Media.belongsTo(models.User, { foreignKey: 'moderatedById', as: 'moderator' });

    // comments/likes via polymorphic pattern: Comment/Like store targetType & targetId
    Media.hasMany(models.Comment, { foreignKey: 'targetId', constraints: false, scope: { targetType: 'Media' }, as: 'comments' });
    Media.hasMany(models.Like, { foreignKey: 'targetId', constraints: false, scope: { targetType: 'Media' }, as: 'likes' });
  };

  return Media;
};
