import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './components/App/App';
import About from './components/About/About';
import DashboardView from './dashboard/DashboardView';
import LoginView from './account/login/LoginView';
import RegistrationView from './account/registration/RegistrationView';
import WelcomeView from './components/WelcomeView';

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/about" component={About} />
      <Route exact path="/login" component={LoginView} />
      <Route exact path="/register" component={RegistrationView} />
      <Route exact path="/welcome" component={WelcomeView} />
      <Route exact path="/dashboard" component={DashboardView} />
    </div>
  </Router>
);

export default Routes;
