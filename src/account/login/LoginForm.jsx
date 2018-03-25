import React, { Component } from 'react';
import { Button, ButtonToolbar, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Redirect } from 'react-router-dom';

import { postLogin, clearLoginStatus, clearRegistrationStatus } from '../authentication.api';

const initialState = {
  email: '',
  password: ''
};

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.didPreviousLoginFail = this.didPreviousLoginFail.bind(this);
    this.clearPreviousFailedLoginStatus = this.clearPreviousFailedLoginStatus.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.login = this.login.bind(this);

    this.state = initialState;
  }

  componentWillMount() {
    this.props.clearLoginStatus();
  }

  clearPreviousFailedLoginStatus() {
    if (this.didPreviousLoginFail()) {
      this.props.clearLoginStatus();
    }
  }

  didPreviousLoginFail() {
    return this.props.loginStatus && this.props.loginStatus !== 200;
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  login(event) {
    event.preventDefault();
    this.props.postLogin(this.state);
    this.props.clearRegistrationStatus();
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    const afterRegistration = this.props.registrationStatus === 200
      ? <div className="bg-success text-center">Rekisteröityminen onnistui, tervetuloa!</div>
      : null;

    const invalidCredentials = this.didPreviousLoginFail()
      ? <p className="bg-danger">Sähköpostiosoite tai salasana ei kelpaa</p>
      : null;

    return (
      <form onSubmit={this.login} onChange={this.clearPreviousFailedLoginStatus}>
        {afterRegistration}
        <FormGroup controlId="loginEmail">
          <ControlLabel>Sähköpostiosoite</ControlLabel>
          <FormControl
            type="email"
            placeholder="Sähköpostiosoite"
            onChange={this.handleEmailChange}
          />
        </FormGroup>
        <FormGroup controlId="loginPassword">
          <ControlLabel>Salasana</ControlLabel>
          <FormControl type="password" placeholder="Salasana" onChange={this.handlePasswordChange} />
        </FormGroup>
        <div className="text-center">
          {invalidCredentials}
        </div>
        <ButtonToolbar>
          <Button bsStyle="primary" type="submit">
            Kirjaudu
          </Button>
          <Link className="btn btn-link" to="/">Peru</Link>
        </ButtonToolbar>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.account.isAuthenticated,
    loginStatus: state.account.loginStatus,
    registrationStatus: state.account.registrationStatus
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ postLogin, clearLoginStatus, clearRegistrationStatus }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
