import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home">
      <div className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1>Authentication App</h1>
            <p className="lead">
              A full-stack React application with JWT authentication
            </p>
            <div className="buttons">
              {!isAuthenticated ? (
                <>
                  <Link to="/register" className="btn btn-primary">
                    Sign Up
                  </Link>
                  <Link to="/login" className="btn btn-light">
                    Login
                  </Link>
                </>
              ) : (
                <Link to="/dashboard" className="btn btn-primary">
                  Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;