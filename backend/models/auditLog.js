module.exports = (sequelize, DataTypes) => {
  const AuditLog = sequelize.define('AuditLog', {
    id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    action: { type: DataTypes.STRING(200), allowNull: false }, // e.g. "DELETE_MEDIA", "APPROVE_USER"
    resourceType: { type: DataTypes.STRING(100) },
    resourceId: { type: DataTypes.BIGINT.UNSIGNED },
    meta: { type: DataTypes.JSON }, // store payload or diff
    ip: { type: DataTypes.STRING(100) }
  }, {
    tableName: 'audit_logs',
    underscored: true,
    timestamps: true,
  });

  AuditLog.associate = (models) => {
    AuditLog.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return AuditLog;
};
