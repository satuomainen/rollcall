const bcrypt = require('bcrypt');

/**
 * SALT_ROUNDS relates to how many iterations of hashing a password goes through
 * before bcrypt returns the hash.
 *
 * See bcrypt documentation https://www.npmjs.com/package/bcrypt#a-note-on-rounds
 */
const SALT_ROUNDS = 8;

module.exports = (sequelize, DataTypes) => {

  const Participant = sequelize.define(
    'Participant',
    {
      name: {
        field: 'name',
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        field: 'email',
        type: DataTypes.STRING,
        allowNull: false
      },
      passwordHash: {
        field: 'password_hash',
        type: DataTypes.STRING,
        allowNull: true
      },
      password: {
        type: DataTypes.VIRTUAL,
        allowNull: false,
        set: function(plainTextPassword) { // eslint-disable-line
          // Why bcrypt? See https://codahale.com/how-to-safely-store-a-password/
          const passwordHash = bcrypt.hashSync(plainTextPassword, SALT_ROUNDS);
          this.setDataValue('password', plainTextPassword);
          this.setDataValue('passwordHash', passwordHash);
        }
      }
    },
    {
      underscored: true,
      tableName: 'participants',
      freezeTableName: true,
      indexes: [
        { fields: ['email'], unique: true }
      ]
    }
  );

  // Class methods
  Participant.associate = models => {
    Participant.belongsToMany(models.Rollcall, {
      through: {
        model: models.ParticipationStatus,
        unique: false
      },
      foreignKey: {
        name: 'participant_id',
        allowNull: false
      },
      constraints: false
    });
    Participant.hasMany(models.Rollcall, {
      as: 'leader',
      foreignKey: {
        name: 'leader_id',
        allowNull: false
      }
    });
  };

  /**
   * Check that the plainTextPassword given matches the password stored in the database.
   * @param plainTextPassword Value to check against stored password hash
   * @returns A promise with the value true if the passwords match and false otherwise
   */
  Participant.prototype.verifyPassword = function(plainTextPassword) { // eslint-disable-line
    return bcrypt.compare(plainTextPassword, this.get('passwordHash'));
  };

  /**
   * Override JSON conversion to exclude passwordHash field from the response
   */
  Participant.prototype.toJSON = function() {
    const values = Object.assign({}, this.get());

    delete values.password;
    delete values.passwordHash;
    return values;
  };

  return Participant;
};
