import React, { useCallback, useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import '../styles/Users.css'
import { useNavigate } from 'react-router-dom';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8000/api/users', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }})

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        alert('Erro de autorização');
        navigate('/')
        console.log('GET Users - Erro na requisição');
      }
    } catch (error) {
      setError('Erro de autorização');
      console.log('GET Users - Erro na requisição', error);
    }
  }, [navigate]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      <Navigation />
      <div className='users-page'>
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
      </div>
    </>
  );
}
