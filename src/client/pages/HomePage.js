import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = ({auth}) => {
  return (
    <div className="center-align" style={{ marginTop: '200px' }}>
      <h3>Welcome</h3>
      {
        auth ?
        <Link to={'/draw'}>Click here to start drawing</Link> :
        <p>Login to start drawing</p>
      }
    </div>
  );
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default {
  component: connect(mapStateToProps)(Home)
};
