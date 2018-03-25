import React from 'react';

import RegisterForm from './RegisterForm';

import './RegistrationView.css';

export default () => (
  <div className="container">
    <div className="row">
      <h1 className="brand-text text-center">Paikalla!</h1>
      <div className="registration-view col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4">
        <h3 className="text-center">Luo tunnus</h3>
        <RegisterForm />
      </div>
    </div>
  </div>
);
