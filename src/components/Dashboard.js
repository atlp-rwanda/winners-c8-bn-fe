import React from 'react';
const Dashboard = (props) => {
  return (
    <div className="home">
      <div className="main">
        <h2 style={{ color: 'brown' }}>
          <strong>This Is The DASHBOARD!</strong>
        </h2>
        <br></br>
        <h3>
          {!localStorage.getItem('auth-token')
            ? '--- Not logged in ---'
            : 'You are logged in with this token:'}
        </h3>
        <pre style={{ width: '70%' }}>{localStorage.getItem('auth-token')}</pre>
      </div>
    </div>
  );
};

export default Dashboard;
