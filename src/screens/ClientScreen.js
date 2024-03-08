import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientScreen = () => {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('https://api.example.com/clients');
        setClients(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchClients();
  }, []);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search clients"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {error && <div>Error: {error}</div>}
      <div style={{ overflowY: 'scroll', height: '500px' }}>
        {filteredClients.map(client => (
          <div key={client.id}>{client.name}</div>
        ))}
      </div>
    </div>
  );
};

export default ClientScreen;