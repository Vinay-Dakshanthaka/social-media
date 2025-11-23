module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT },
    albumType: { type: DataTypes.ENUM('PHOTO','VIDEO','MIXED'), defaultValue: 'PHOTO' },
    event: { type: DataTypes.STRING(150) },     // event name
    year: { type: DataTypes.STRING(50) },
    department: { type: DataTypes.STRING(100) },
    isFeatured: { type: DataTypes.BOOLEAN, defaultValue: false }, // album-level featured
    visibility: { type: DataTypes.ENUM('PRIVATE','GROUP','ALL_STUDENTS','ADMINS_ONLY'), defaultValue: 'GROUP' },
    allowDownload: { type: DataTypes.BOOLEAN, defaultValue: false },
    createdById: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    groupId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true } // if album belongs to group
  }, {
    tableName: 'albums',
    underscored: true,
    paranoid: true,
  });

  Album.associate = (models) => {
    Album.belongsTo(models.User, { foreignKey: 'createdById', as: 'createdBy' });
    Album.belongsTo(models.Group, { foreignKey: 'groupId', as: 'group' });
    Album.hasMany(models.Media, { foreignKey: 'albumId', as: 'media' });
  };

  return Album;
};
