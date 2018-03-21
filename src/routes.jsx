import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './containers/AppContainer';
import About from './components/About/About';

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/about" component={About} />
    </div>
  </Router>
);

export default Routes;
