
'use strict';
// in this file you can append custom step methods to 'I' object

module.exports = function() {
  return actor({
    register: function(registrationDetails) {
      this.seeCurrentUrlEquals('/register');
      this.fillField('Nimi (pakollinen)', registrationDetails.name);
      this.fillField('Sähköpostiosoite (pakollinen)', registrationDetails.email);
      this.fillField('Salasana (pakollinen)', registrationDetails.password);
      this.fillField('Salasana uudelleen (pakollinen)', registrationDetails.password);
      this.click('Rekisteröidy');
    },
    login: function(email, password) {
      this.seeCurrentUrlEquals('/login');
      this.fillField('Sähköpostiosoite', email);
      this.fillField('Salasana', password);
      this.click('Kirjaudu');
    }
  });
};
