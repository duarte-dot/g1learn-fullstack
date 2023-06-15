import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      const { token, user } = data;
      const userId = user.id;

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
            <div className='login-email'>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleInputChange}
              />
            </div>
            <div className='login-password'>
              <label htmlFor="password">Senha:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
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
