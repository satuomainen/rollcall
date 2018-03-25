import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';

import AppHeader from '../AppHeader';
import DashboardView from '../../dashboard/DashboardView';
import WelcomeView from '../WelcomeView/index';
import { getAccount, postLogout } from '../../account/authentication.api';

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

function mapStateToProps(state) {
  return {
    isAuthenticated: state.account.isAuthenticated,
    account: state.account.account
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAccount,
    postLogout
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
