module.exports = (sequelize, DataTypes) => {
  const GroupMember = sequelize.define('GroupMember', {
    id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    groupId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    roleInGroup: { type: DataTypes.ENUM('STUDENT','REP','MENTOR'), defaultValue: 'STUDENT' }, // optional
  }, {
    tableName: 'group_members',
    underscored: true,
    timestamps: true,
    indexes: [{ fields: ['group_id'] }, { fields: ['user_id'] }]
  });

  GroupMember.associate = models => {
    // belongsTo are optional here
  };

  return GroupMember;
};
