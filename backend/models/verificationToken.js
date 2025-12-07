module.exports = (sequelize, DataTypes) => {
  const VerificationToken = sequelize.define(
    "VerificationToken",
    {
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      type: {
        type: DataTypes.ENUM("email_verification"),
        defaultValue: "email_verification",
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      }
    },
    {
      tableName: "verification_tokens",
      timestamps: true,
    }
  );

  VerificationToken.associate = (models) => {
    VerificationToken.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE",
    });
  };

  return VerificationToken;
};
