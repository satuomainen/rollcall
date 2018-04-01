import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ButtonToolbar,
  ControlLabel,
  FormControl,
  FormGroup,
  HelpBlock
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Redirect } from 'react-router-dom';

import { postRegistration, clearRegistrationStatus } from '../authentication.api';

const initialState = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: ''
};

class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmChange = this.handlePasswordConfirmChange.bind(this);
    this.registerAccount = this.registerAccount.bind(this);
    this.isNameValid = this.isNameValid.bind(this);
    this.nameValidationState = this.nameValidationState.bind(this);
    this.isEmailValid = this.isEmailValid.bind(this);
    this.emailValidationState = this.emailValidationState.bind(this);
    this.isPasswordValid = this.isPasswordValid.bind(this);
    this.passwordValidationState = this.passwordValidationState.bind(this);
    this.isPasswordConfirmValid = this.isPasswordConfirmValid.bind(this);
    this.passwordConfirmValidationState = this.passwordConfirmValidationState.bind(this);
    this.isFormValid = this.isFormValid.bind(this);

    this.state = initialState;
  }

  componentWillMount() {
    this.props.clearRegistrationStatus();
  }

  isNameValid() {
    return this.state.name && this.state.name.length > 0;
  }

  nameValidationState() {
    return this.isNameValid() ? 'success' : 'error';
  }

  isEmailValid() {
    return this.state.email && this.state.email.length > 0; // TODO
  }

  emailValidationState() {
    return this.isEmailValid() ? 'success' : 'error';
  }

  isPasswordValid() {
    return this.state.password && this.state.password.length > 0;
  }

  passwordValidationState() {
    return this.isPasswordValid() ? 'success' : 'error';
  }

  isPasswordConfirmValid() {
    return this.state.passwordConfirm
      && this.state.passwordConfirm.length > 0
      && this.state.password === this.state.passwordConfirm;
  }

  passwordConfirmValidationState() {
    return this.isPasswordConfirmValid() ? 'success' : 'error';
  }

  isFormValid() {
    return this.isEmailValid() && this.isPasswordValid() && this.isPasswordConfirmValid();
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handlePasswordConfirmChange(event) {
    this.setState({ passwordConfirm: event.target.value });
  }

  registerAccount(event) {
    event.preventDefault();
    this.props.postRegistration(this.state);
  }

  render() {
    if (this.props.registrationStatus === 200) {
      return <Redirect to="/login" />;
    }

    const usernameTakenError = this.props.registrationStatus === 409
      ? <p className="bg-danger ">Sähköpostiosoite on jo käytössä</p>
      : null;

    return (
      <form onSubmit={this.registerAccount} onChange={this.props.clearRegistrationStatus}>
        <FormGroup
          controlId="registrationName"
          validationState={this.nameValidationState()}
        >
          <ControlLabel>Nimi (pakollinen)</ControlLabel>
          <FormControl
            type="text"
            value={this.state.name}
            placeholder="Etunimi Sukunimi"
            onChange={this.handleNameChange}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup
          controlId="registrationEmail"
          validationState={this.emailValidationState()}
        >
          <ControlLabel>Sähköpostiosoite (pakollinen)</ControlLabel>
          {usernameTakenError}
          <FormControl
            type="email"
            value={this.state.email}
            placeholder="Sähköpostiosoite"
            onChange={this.handleEmailChange}
          />
          <FormControl.Feedback />
          <HelpBlock>Sähköpostiosoite on käyttäjätunnuksesi</HelpBlock>
        </FormGroup>
        <FormGroup
          controlId="registrationPassword"
          validationState={this.passwordValidationState()}
        >
          <ControlLabel>Salasana (pakollinen)</ControlLabel>
          <FormControl
            type="password"
            value={this.state.password}
            placeholder="Salasana"
            onChange={this.handlePasswordChange}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup
          controlId="registrationPasswordConfirm"
          validationState={this.passwordConfirmValidationState()}
        >
          <ControlLabel>Salasana uudelleen (pakollinen)</ControlLabel>
          <FormControl
            type="password"
            value={this.state.passwordConfirm}
            placeholder="Salasana uudelleen"
            onChange={this.handlePasswordConfirmChange}
          />
          <FormControl.Feedback />
        </FormGroup>
        <ButtonToolbar>
          <Button
            bsStyle="primary"
            type="submit"
            disabled={!this.isFormValid()}
          >
            Rekisteröidy
          </Button>
          <Link className="btn btn-link" to="/">Peru</Link>
        </ButtonToolbar>
      </form>
    );
  }
}

RegisterForm.propTypes = {
  registrationStatus: PropTypes.number,
  postRegistration: PropTypes.func,
  clearRegistrationStatus: PropTypes.func

};

function mapStateToProps(state) {
  return {
    registrationStatus: state.account.registrationStatus
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ postRegistration, clearRegistrationStatus }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
