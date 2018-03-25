import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class WelcomeView extends Component {
  render() {
    return (
      <div className="container">
        <Jumbotron>
          <h2>Ne jotka eivät ole paikalla, huutavat HEP!</h2>
          <p>
            Enää ei ole tarpeen kiusaantua nimenhuudossa vastaamalla oman nimen kuullessaan
            <i> "Paikalla!"</i>.
          </p>
          <p>
            Tämän keksinnön avulla seuramatkalaisten ei tarvitse nostaa katsettaan älypuhelimesta
            eikä matkanjohtajan joudu huutelemaan ihmisiä nimeltä. Matkalaiset voivat jatkaa ruudun
            tuijottamista ja matkanjohtaja saa helposti selville voiko bussi lähteä vai pitääkö
            vieläkin odottaa saviruukun sirpaleista ja syöpyneistä pronssimiekoista kiinnostuneita
            matkailijoita saapuvaksi museokierrokselta.
          </p>
          <div className="well text-left">
            <div>Mutta miten tämä oikein on mahdollista?</div>
            <div>
              Helposti, tee näin:
              <ul>
                <li>Luo uusi nimenhuuto ja anna sille kuvaava nimi, niin saat osallistujatunnuksen.</li>
                <li>
                  Pyydä matkalaisia tulemaan tälle sivulle matkan alussa ja kerro heille
                  osallistujatunnus, jolla he osallistuvat nimenhuutoon.
                </li>
                <li>
                  Kun ollaan lähdössä, pyydä kaikkia ilmoittamaan sovelluksessa että ovat paikalla.
                  Näet nimenhuudossasi ilmoittautuneiden vastaukset ja näet helposti ovatko kaikki
                  kyydissä.
                </li>
              </ul>
            </div>
          </div>
          <div>
            <Link className="btn btn-primary" to="login">Kirjaudu</Link>
            <Link className="btn btn-link" to="register">Rekisteröidy</Link>
          </div>
        </Jumbotron>
      </div>
    );
  }
}

export default WelcomeView;
