module.exports = (sequelize, DataTypes) => {
  const ParentStudent = sequelize.define('ParentStudent', {
    id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    parentId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    studentId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    relation: { type: DataTypes.STRING(50) }, // e.g., father, mother
  }, {
    tableName: 'parent_student',
    timestamps: true,
    underscored: true,
    indexes: [{ fields: ['parent_id'] }, { fields: ['student_id'] }],
  });

  ParentStudent.associate = (models) => {
    // associations are declared on User side as belongsToMany
  };

  return ParentStudent;
};
