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

  I.register({
    name: 'Teuvo Testaaja',
    email: 'teuvo.testaaja@example.com',
    password: 'salasan1Passw0rd'
  });

  I.waitForElement('.registerSuccess', 2);
  I.see('Rekisteröityminen onnistui');
  I.seeCurrentUrlEquals('/login');
});

Scenario('Login', (I) => {
  I.amOnPage('/');
  I.click('Kirjaudu');

  I.login('teuvo.testaaja@example.com', 'salasan1Passw0rd');

  I.waitForElement('.loggedInView', 2);
  I.see('Tähän tulee näkyviin kaksi listaa nimenhuutoja');
  I.seeCurrentUrlEquals('/');
});
