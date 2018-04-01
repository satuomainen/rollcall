import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { getAccount } from '../account/authentication.api';

class DashboardView extends Component {
  constructor(props) {
    super(props);

    this.handleGetAccount = this.handleGetAccount.bind(this);
    this.createAccountTable = this.createAccountTable.bind(this);
  }

  handleGetAccount() {
    this.props.getAccount();
  }

  createAccountTable() {
    const { account } = this.props;
    return account
      ? (
        <div className="row text-left">
          <h4>Johonkin tulee sivu, jolla voi muuttaa omia tietojaan:</h4>
          <dl className="dl-horizontal">
            <dt>Nimi</dt>
            <dd>{account.name}</dd>
            <dt>Sähköpostiosoite</dt>
            <dd>{account.email}</dd>
            <dt>Luotu</dt>
            <dd>{account.created_at}</dd>
            <dt>Muutettu viimeksi</dt>
            <dd>{account.updated_at}</dd>
          </dl>
        </div>
      ) : null;
  }

  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <div className="row">
          <h2>Tähän tulee näkyviin kaksi listaa nimenhuutoja</h2>
          <p>Ne joihin osallistun ja ne jotka olen perustanut</p>
        </div>
        <div className="row">
          <div>
            <button className="btn btn-info" onClick={this.handleGetAccount}>Hae omat tiedot</button>
          </div>
        </div>
        {this.createAccountTable()}
      </div>
    );
  };
}

DashboardView.propTypes = {
  isAuthenticated: PropTypes.bool,
  account: PropTypes.object,
  getAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.account.isAuthenticated,
  account: state.account.account
});

const mapDispatchToProps = dispatch => (bindActionCreators({ getAccount }, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(DashboardView);
