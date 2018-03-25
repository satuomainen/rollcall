import React from 'react';

import LoginForm from './LoginForm';

import './LoginView.css';

export default () => (
  <div className="container">
    <div className="row">
      <h1 className="brand-text text-center">Paikalla!</h1>
      <div className="login-view col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4">
        <h3 className="text-center">Kirjaudu</h3>
        <LoginForm />
      </div>
    </div>
  </div>
);
