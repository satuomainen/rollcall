
module.exports = (sequelize, DataTypes) => {
  const ParticipationStatus = sequelize.define(
    'ParticipationStatus',
    {
      status: {
        field: 'status',
        type: DataTypes.STRING,
        allowNull: false
      },
      participantId: {
        field: 'participant_id',
        type: DataTypes.INTEGER,
        unique: 'uk_participant_rollcall',
        references: null
      },
      rollcallId: {
        field: 'rollcall_id',
        type: DataTypes.INTEGER,
        unique: 'uk_participant_rollcall'
      }
    },
    {
      underscored: true,
      tableName: 'participation_statuses',
      freezeTableName: true
    }
  );

  return ParticipationStatus;
};
