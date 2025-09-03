import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="card">
        <h2>Welcome {user?.name}</h2>
        <p>This is your dashboard. You can only see this page if you are logged in.</p>
        
        <div className="user-info">
          <h3>Your Account Information</h3>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Account created:</strong> {new Date(user?.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;