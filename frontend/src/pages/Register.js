import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css'

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, password_confirmation: passwordConfirmation }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        const userId = data.user.id;

        localStorage.setItem('user_id', userId);
        localStorage.setItem('token', token);

        navigate('/home');
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      setError('Ocorreu um erro na requisição. Por favor, tente novamente.');
      console.log('Erro na requisição', error);
    }
  };

  return (
    <div>
      <div className='register-page'>
        <h2>Registre-se</h2>
        <div className="register-form-box">
          <form className="register-form" onSubmit={handleRegister}>
            <div className="register-name">
              <label htmlFor="name">Nome:</label>
              <input
                required
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="register-email">
              <label htmlFor="email">Email:</label>
              <input
                required
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="register-password">
              <label htmlFor="password">Senha:</label>
              <input
                required
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="register-passwordConfirmation">
              <label htmlFor="passwordConfirmation">Confirme sua senha:</label>
              <input
                required
                type="password"
                id="passwordConfirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </div>
            {error && <p className="register-error">{error}</p>}
            <button className="register-button" type="submit">
              Registrar
            </button>
          </form>
        </div>
        <p className='login-now'>Já registrado? <span onClick={() => navigate('/')}>Faça login!</span></p>
      </div>
    </div>
  );
}
