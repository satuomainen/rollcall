
module.exports = (sequelize, DataTypes) => {
  const Rollcall = sequelize.define(
    'Rollcall',
    {
      name: {
        field: 'name',
        type: DataTypes.STRING,
        allowNull: false
      },
      leaderCode: {
        field: 'leader_code',
        type: DataTypes.STRING,
        allowNull: false
      },
      participantCode: {
        field: 'participant_code',
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      underscored: true,
      tableName: 'rollcalls',
      freezeTableName: true,
      indexes: [
        { fields: ['leader_code'], unique: true },
        { fields: ['participant_code'], unique: true }
      ]
    }
  );
  Rollcall.associate = models => {
    Rollcall.belongsToMany(models.Participant, {
      through: {
        model: models.ParticipationStatus,
        unique: false
      },
      foreignKey: {
        name: 'rollcall_id',
        allowNull: false
      },
      constraints: false
    });
  };

  return Rollcall;
};
