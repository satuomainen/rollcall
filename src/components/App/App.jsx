import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';

import AppHeader from '../AppHeader';
import DashboardView from '../../dashboard/DashboardView';
import WelcomeView from '../WelcomeView/index';
import { getAccount } from '../../account/authentication.api';

import './style.css';

class App extends Component {
  componentWillMount() {
    this.props.getAccount();
  }

  render() {
    const { className } = this.props;
    const appBody = this.props.isAuthenticated ? <DashboardView /> : <WelcomeView />;

    return (
      <div className={classnames('App', className)} >
        <AppHeader />
        {appBody}
      </div>
    );
  }
}

App.propTypes = {
  className: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  getAccount: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.account.isAuthenticated
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAccount
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
