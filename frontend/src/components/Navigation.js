import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';

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

const Navigation = () => {
  const [withShadow, setWithShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setWithShadow(position > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`header-menu${withShadow ? ' with-shadow' : ''}`}>
      <img className='header-logo' src='https://g1learn.com/logo-g1.png?imwidth=256' alt='logo' />
      <ul className="header-menu-list">
        {navLinks.map((link) => (
          <li className='nav-link' key={link.path}>
            {link.logout ? (
              <button className='button-logout' onClick={handleLogout}>{link.title}</button>
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
};

export default Navigation;
