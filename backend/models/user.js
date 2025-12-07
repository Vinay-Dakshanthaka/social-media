// models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },

    // authentication
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    passwordHash: { type: DataTypes.STRING(255) }, // null for invited/SSO accounts
    role: { type: DataTypes.ENUM('PRINCIPAL','HOD','ADMIN','STAFF','STUDENT','PARENT'), allowNull: false, defaultValue: 'STUDENT' },

    // profile
    firstName: { type: DataTypes.STRING(100) },
    lastName: { type: DataTypes.STRING(100) },
    phone: { type: DataTypes.STRING(30) },
    avatarUrl: { type: DataTypes.STRING(1024) },

    // verification & invitation
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    isApproved: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    inviteToken: { type: DataTypes.STRING(128), allowNull: true },
    inviteTokenExpiresAt: { type: DataTypes.DATE, allowNull: true },
    isVerified: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },

    forcePasswordChange: {
  type: DataTypes.BOOLEAN,
  allowNull: false,
  defaultValue: true,
  field: "forcePasswordChange" 
},

    
    // security
    twoFactorEnabled: { type: DataTypes.BOOLEAN, defaultValue: false },

    // audit fields (createdAt / updatedAt by Sequelize)
  }, {
    tableName: 'users',
    paranoid: true, // soft delete via deletedAt
    underscored: true,
  });

  User.associate = (models) => {
    // one-to-many: user created albums, posts, media
    User.hasMany(models.Album, { foreignKey: 'createdById', as: 'createdAlbums' });
    User.hasMany(models.Media, { foreignKey: 'uploadedById', as: 'uploads' });
    User.hasMany(models.Post, { foreignKey: 'createdById', as: 'posts' });

    // parent <-> student linking: student has parentId in StudentProfile (or relationship table)
    User.hasMany(models.Notification, { foreignKey: 'userId', as: 'notifications' });

    // likes & comments
    User.hasMany(models.Like, { foreignKey: 'userId', as: 'likes' });
    User.hasMany(models.Comment, { foreignKey: 'userId', as: 'comments' });

    // if parents need to be linked to students via a join table:
    User.belongsToMany(models.User, {
      as: 'Children',
      through: models.ParentStudent,
      foreignKey: 'parentId',
      otherKey: 'studentId',
    });

    User.belongsToMany(models.User, {
      as: 'Parents',
      through: models.ParentStudent,
      foreignKey: 'studentId',
      otherKey: 'parentId',
    });
  };

  return User;
};
