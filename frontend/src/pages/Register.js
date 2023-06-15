import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, password_confirmation }),
      });

      const data = await response.json();
      const token = data.token;
      const userId = data.user.id;

      localStorage.setItem('user_id', userId);
      localStorage.setItem('token', token)

      navigate('/home');
    } catch (error) {
      alert(error);
      console.log('Erro na requisição', error);
    }
  };

  return (
    <div>
    <div>
      <h2>Registre-se</h2>

    <div className='register-form-box'>
        <form className='register-form' onSubmit={handleRegister}>
        <div className='register-name'>
            <label htmlFor="name">name:</label>
            <input
              required
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='register-email'>
            <label htmlFor="email">email:</label>
            <input
              required
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='register-password'>
            <label htmlFor="password">senha:</label>
            <input
              required
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='register-passwordConfirmation'>
            <label htmlFor="passwordConfirmation">confirme sua senha:</label>
            <input
              required
              type="password"
              id="passwordConfirmation"
              value={password_confirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>
          <button className='register-button' type="submit">Registrar</button>
        </form>
      </div>
    </div>
    </div>
  );
}
