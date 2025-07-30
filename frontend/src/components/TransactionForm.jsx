import React, { useState, useEffect } from 'react';
import api from '../services/api';

const TransactionForm = ({ onTransactionAdded }) => {
  const [date, setDate] = useState('');
  const [montant, setMontant] = useState('');
  const [payee, setPayee] = useState(false);
  const [clientId, setClientId] = useState('');
  const [collaborateurId, setCollaborateurId] = useState('');
  const [clients, setClients] = useState([]);
  const [collaborateurs, setCollaborateurs] = useState([]);

  useEffect(() => {
    api.get('/clients')
      .then(response => setClients(response.data))
      .catch(error => console.error('Error fetching clients', error));
    api.get('/collaborateurs')
      .then(response => setCollaborateurs(response.data))
      .catch(error => console.error('Error fetching collaborateurs', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const transaction = { date, montant, payee, clientId, collaborateurId };
    api.post('/transactions', transaction)
      .then(response => {
        onTransactionAdded(response.data);
        setDate('');
        setMontant('');
        setPayee(false);
        setClientId('');
        setCollaborateurId('');
      })
      .catch(error => {
        console.error('There was an error creating the transaction!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Transaction</h3>
      <div>
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div>
        <label>Amount:</label>
        <input type="number" value={montant} onChange={(e) => setMontant(e.target.value)} required />
      </div>
      <div>
        <label>Paid:</label>
        <input type="checkbox" checked={payee} onChange={(e) => setPayee(e.target.checked)} />
      </div>
      <div>
        <label>Client:</label>
        <select value={clientId} onChange={(e) => setClientId(e.target.value)} required>
          <option value="">Select Client</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>{client.nom}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Collaborator:</label>
        <select value={collaborateurId} onChange={(e) => setCollaborateurId(e.target.value)} required>
          <option value="">Select Collaborator</option>
          {collaborateurs.map(collaborateur => (
            <option key={collaborateur.id} value={collaborateur.id}>{collaborateur.nom}</option>
          ))}
        </select>
      </div>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
