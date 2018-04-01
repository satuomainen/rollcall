import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { postLogout } from '../../account/authentication.api';

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.postLogout();
  }

  createMenuItemsForNotAuthenticatedUser() {
    return (
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem eventKey={4} href="/login">Kirjaudu</NavItem>
        </Nav>
      </Navbar.Collapse>
    );
  }

  createMenuItemsForAuthenticatedUser() {
    const userName = _.get(this.props, 'account.name', 'Omat tiedot');
    return (
      <Navbar.Collapse>
        <Nav pullRight>
          <NavDropdown eventKey={3} title={userName} id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Omat tiedot</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.4} onClick={this.handleLogout}>Kirjaudu ulos</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    );
  }

  render() {
    const menu = this.props.isAuthenticated
      ? this.createMenuItemsForAuthenticatedUser()
      : this.createMenuItemsForNotAuthenticatedUser();

    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            Paikalla!
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        {menu}
      </Navbar>
    );
  }
}

AppHeader.propTypes = {
  isAuthenticated: PropTypes.bool,
  account: PropTypes.object,
  postLogout: PropTypes.func.isRequired
};


function mapStateToProps(state) {
  return {
    isAuthenticated: state.account.isAuthenticated,
    account: state.account.account
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    postLogout
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
