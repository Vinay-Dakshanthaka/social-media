// module.exports = (sequelize, DataTypes) => {
//   const Group = sequelize.define('Group', {
//     id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
//     name: { type: DataTypes.STRING(150), allowNull: false },
//     year: { type: DataTypes.STRING(50) },          // e.g., "2025"
//     department: { type: DataTypes.STRING(100) },   // e.g., "CSE"
//     description: { type: DataTypes.TEXT },
//     visibility: { type: DataTypes.ENUM('PRIVATE','COLLEGE','ALL_ADMINS'), defaultValue: 'PRIVATE' }
//   }, {
//     tableName: 'groups',
//     underscored: true,
//     paranoid: true
//   });

//   Group.associate = models => {
//     Group.belongsToMany(models.User, { through: models.GroupMember, foreignKey: 'groupId', as: 'members' });
//     Group.hasMany(models.Album, { foreignKey: 'groupId', as: 'albums' });
//   };

//   return Group;
// };

module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define(
    "Group",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: DataTypes.STRING(150), allowNull: false },
      year: { type: DataTypes.STRING(50) },
      department: { type: DataTypes.STRING(100) },
      description: { type: DataTypes.TEXT },
      visibility: {
        type: DataTypes.ENUM("PRIVATE", "COLLEGE", "ALL_ADMINS"),
        defaultValue: "PRIVATE",
      },
    },
    {
      tableName: "groups",
      underscored: true,
      paranoid: true,
    }
  );

  Group.associate = (models) => {
    // Many Users through GroupMember join table
    Group.belongsToMany(models.User, {
      through: models.GroupMember,
      foreignKey: "groupId",
      as: "members",
    });

    // REQUIRED: direct association to GroupMember
    Group.hasMany(models.GroupMember, {
      foreignKey: "groupId",
      as: "groupMembers",
    });

    // One group has many albums
    Group.hasMany(models.Album, {
      foreignKey: "groupId",
      as: "albums",
    });
  };

  return Group;
};
