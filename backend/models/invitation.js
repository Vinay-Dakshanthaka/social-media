module.exports = (sequelize, DataTypes) => {
  const Invitation = sequelize.define('Invitation', {
    id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING(255), allowNull: false },
    token: { type: DataTypes.STRING(128), allowNull: false },
    invitedById: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    role: { type: DataTypes.ENUM('STUDENT','PARENT'), allowNull: false },
    status: { type: DataTypes.ENUM('PENDING','ACCEPTED','DECLINED'), defaultValue: 'PENDING' },
    expiresAt: { type: DataTypes.DATE }
  }, {
    tableName: 'invitations',
    underscored: true,
    timestamps: true,
  });

  Invitation.associate = models => {
    Invitation.belongsTo(models.User, { foreignKey: 'invitedById', as: 'inviter' });
  };

  return Invitation;
};
