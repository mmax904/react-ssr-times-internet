import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import s from '../assets/styles/styles.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

const Header = ({ auth }) => {
  const authButton = auth ? (
    <a href="/api/logout">Logout</a>
  ) : (
    <a href="/api/auth/google">Login</a>
  );

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">
          Drawing Canvas
        </Link>
        <ul className="right">
          <li>
            <Link to="/draw">Canvas</Link>
          </li>
          <li>{authButton}</li>
        </ul>
      </div>
    </nav>
  );
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(withStyles(s)(Header));

