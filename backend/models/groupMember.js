// module.exports = (sequelize, DataTypes) => {
//   const GroupMember = sequelize.define('GroupMember', {
//     id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
//     groupId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
//     userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
//     roleInGroup: { type: DataTypes.ENUM('STUDENT','REP','MENTOR'), defaultValue: 'STUDENT' }, // optional
//   }, {
//     tableName: 'group_members',
//     underscored: true,
//     timestamps: true,
//     indexes: [{ fields: ['group_id'] }, { fields: ['user_id'] }]
//   });

//   GroupMember.associate = models => {
//     // belongsTo are optional here
//   };

//   return GroupMember;
// };

// module.exports = (sequelize, DataTypes) => {
//   const GroupMember = sequelize.define(
//     "GroupMember",
//     {
//       id: {
//         type: DataTypes.INTEGER.UNSIGNED,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       groupId: {
//         type: DataTypes.INTEGER.UNSIGNED,
//         allowNull: false,
//       },
//       userId: {
//         type: DataTypes.INTEGER.UNSIGNED,
//         allowNull: false,
//       },
//       roleInGroup: {
//         type: DataTypes.ENUM("STUDENT", "REP", "MENTOR"),
//         defaultValue: "STUDENT",
//       },
//     },
//     {
//       tableName: "group_members",
//       underscored: true,
//       timestamps: true,
//       indexes: [
//         { fields: ["group_id"] },
//         { fields: ["user_id"] }
//       ],
//     }
//   );

//   GroupMember.associate = (models) => {
//     // Link back to Group
//     GroupMember.belongsTo(models.Group, {
//       foreignKey: "groupId",
//       as: "group",
//     });

//     // Link to User
//     GroupMember.belongsTo(models.User, {
//       foreignKey: "userId",
//       as: "user",
//     });
//   };

//   return GroupMember;
// };


module.exports = (sequelize, DataTypes) => {
  const GroupMember = sequelize.define(
    "GroupMember",
    {
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "group_id",
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
      },
      roleInGroup: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "STUDENT",
        field: "role_in_group",
      },
    },
    {
      tableName: "group_members",
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  GroupMember.associate = (models) => {
    GroupMember.belongsTo(models.Group, { foreignKey: "groupId", });
    GroupMember.belongsTo(models.User, { foreignKey: "userId", as: "user", });
  };

  return GroupMember;
};
