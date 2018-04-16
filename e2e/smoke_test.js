'use strict';

Feature('Smoke test.js');

Scenario('Load page', (I) => {
  I.amOnPage('/');
  I.see('Ne jotka eivät ole paikalla, huutavat HEP');
});

Scenario('Register', (I) => {
  I.amOnPage('/');
  I.see('Rekisteröidy');
  I.click('Rekisteröidy');

  // Register dialog
  I.see('Luo tunnus');
  I.seeCurrentUrlEquals('/register');
  I.fillField('Nimi (pakollinen)', 'Teuvo Testaaja');
  I.fillField('Sähköpostiosoite (pakollinen)', 'teuvo.testaaja@example.com');
  I.fillField('Salasana (pakollinen)', 'salasan1Passw0rd');
  I.fillField('Salasana uudelleen (pakollinen)', 'salasan1Passw0rd');
  I.click('Rekisteröidy');

  I.waitForElement('.registerSuccess', 2);
  I.see('Rekisteröityminen onnistui');
  I.seeCurrentUrlEquals('/login');
});

Scenario('Login', (I) => {
  I.amOnPage('/');
  I.click('Kirjaudu');
  I.seeCurrentUrlEquals('/login');
  I.fillField('Sähköpostiosoite', 'teuvo.testaaja@example.com');
  I.fillField('Salasana', 'salasan1Passw0rd');
  I.click('Kirjaudu');

  I.see('Tähän tulee näkyviin kaksi listaa nimenhuutoja');
  I.seeCurrentUrlEquals('/');
});
