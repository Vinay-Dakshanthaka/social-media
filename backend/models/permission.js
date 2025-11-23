module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },

    // subject: who receives the permission (a user or a group)
    subjectType: { type: DataTypes.ENUM('User','Group'), allowNull: false },
    subjectId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },

    // resource: what the permission applies to
    resourceType: { type: DataTypes.ENUM('Album','Media','Post'), allowNull: false },
    resourceId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },

    canView: { type: DataTypes.BOOLEAN, defaultValue: true },
    canComment: { type: DataTypes.BOOLEAN, defaultValue: true },
    canDownload: { type: DataTypes.BOOLEAN, defaultValue: false },
    canShare: { type: DataTypes.BOOLEAN, defaultValue: false },

  }, {
    tableName: 'permissions',
    underscored: true,
    timestamps: true,
    indexes: [{ fields: ['subject_type','subject_id'] }, { fields: ['resource_type','resource_id'] }]
  });

  return Permission;
};
