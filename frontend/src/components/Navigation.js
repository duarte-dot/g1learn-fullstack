import React from 'react';
import { Link } from 'react-router-dom';

const navLinks = [
  {
    title: 'Home',
    path: '/home',
  },
  {
    title: 'Usuários',
    path: '/users',
  },
  {
    title: 'Logout',
    path: '/',
    logout: true,
  },
];

const handleLogout = () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    window.location.href = '/';
    return;
  }

  fetch('http://localhost:8000/api/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');

        window.location.href = '/';
      } else {
        console.log('Erro ao fazer logout');
      }
    })
    .catch((error) => {
      console.log('Erro ao fazer logout', error);
    });
};

export default function Navigation() {
  return (
    <nav className="header-menu">
      <span>G1 Learn - Fórum</span>
      <ul className="header-menu-list">
        {navLinks.map((link) => (
          <li key={link.path}>
            {link.logout ? (
              <button onClick={handleLogout}>{link.title}</button>
            ) : (
              <Link to={link.path} alt={link.title}>
                {link.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
