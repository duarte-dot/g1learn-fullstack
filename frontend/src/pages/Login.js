import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      const token = data.token;
      const userId = data.user.id;

      localStorage.setItem('user_id', userId);
      localStorage.setItem('token', token);

      navigate('/home');
    } catch (error) {
      alert('Email ou senha inválidos');
      console.log('Erro na requisição', error);
    }
  };

  return (
    <div>
    <div>
      <h2>Login</h2>

    <div className='login-form-box'>
        <form className='login-form' onSubmit={handleLogin}>
          <div className='login-email' >
            <label htmlFor="email">email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='login-password'>
            <label htmlFor="password">senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className='login-button' type="submit">Login</button>
        </form>
      </div>
    </div>
    <div>
      <p>Novo usuário? <span onClick={() => navigate('/register')}>Registre-se</span> agora!</p>
    </div>
    </div>
  );
}
