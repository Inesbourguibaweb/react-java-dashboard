import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ClientList from './ClientList';
import CollaborateurList from './CollaborateurList';
import TransactionList from './TransactionList';

const Dashboard = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/clients">Clients</Link>
            </li>
            <li>
              <Link to="/collaborateurs">Collaborateurs</Link>
            </li>
            <li>
              <Link to="/transactions">Transactions</Link>
            </li>
          </ul>
        </nav>

        <hr />

        <Routes>
          <Route path="/clients" element={<ClientList />} />
          <Route path="/collaborateurs" element={<CollaborateurList />} />
          <Route path="/transactions" element={<TransactionList />} />
          <Route path="/" element={<h2>Home</h2>} />
        </Routes>
      </div>
    </Router>
  );
};

export default Dashboard;
