import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/users');

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        setError('Erro na requisição');
        console.log('Erro na requisição');
      }
    } catch (error) {
      setError('Erro na requisição');
      console.log('Erro na requisição', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Navigation />
      <h1 className="users-title">Users</h1>
      <div className="users-box">
        {error ? (
          <p className="users-error">{error}</p>
        ) : (
          users.map((user, index) => (
            <div className="user" key={index}>
              <p className="user-name">Name: {user.name}</p>
              <p className="user-email">Email: {user.email}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}
