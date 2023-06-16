import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navigation.css';
import { UilMultiply, UilBars, UilSignout } from '@iconscout/react-unicons';

const navLinks = [
  {
    title: 'Home',
    path: '/home',
  },
  {
    title: 'Usuários',
    path: '/users',
  },
];

const handleLogout = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = '/';
    return;
  }

  try {
    const response = await fetch('http://localhost:8000/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      localStorage.removeItem('token');
      localStorage.removeItem('user_id');
      window.location.href = '/';
    } else {
      console.log('Erro ao fazer logout');
    }
  } catch (error) {
    console.log('Erro ao fazer logout', error);
  }
};

const Navigation = () => {
  const [withShadow, setWithShadow] = useState(false);
  const [showingMenu, setShowingMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleScroll = () => {
    const position = window.pageYOffset;
    setWithShadow(position > 0);
  };

  const handleWindowsize = () => {
    if (window.innerWidth >= 992) {
      setShowingMenu(false);
      setShowMenu(false);
    } else {
      setShowingMenu(true);
    }
  };

  const toggleMenu = () => {
    if (window.innerWidth >= 992) {
      setShowMenu(false);
    }
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleWindowsize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleWindowsize);
    };
  }, []);

  useEffect(() => {
    handleWindowsize();
  }, []);

  return (
    <nav
      className={`header-menu ${
        showMenu ? 'header-menu-showing' : ''
      } ${withShadow ? 'with-shadow' : ''}`}
    >
      <div className="logo-and-icons">
        <img
          onClick={() => navigate('/home')}
          className="header-logo"
          src="https://g1learn.com/logo-g1.png?imwidth=256"
          alt="logo"
        />
        <ul className="big-screen-nav-links" style={!showMenu && !showingMenu ? { display: 'flex' } : { display: 'none' }}>
          {navLinks.map((link) => (
            <li
              className="nav-link-2"
              onClick={() => navigate(`${link.path}`)}
              key={link.path}
            >
              {link.title}
            </li>
          ))}
          <button className="button-logout" onClick={handleLogout}>Sair</button>
        </ul>
        {window.innerWidth < 992 && (
          <div className="logout-and-menu">
            <UilSignout
              className="sign-out-icon"
              size={50}
              onClick={handleLogout}
            />
            <UilMultiply
              size={50}
              className="toggle-close-menu"
              style={showMenu ? { display: 'block' } : { display: 'none' }}
              onClick={toggleMenu}
            />
            <UilBars
              size={50}
              className="toggle-menu"
              style={showMenu ? { display: 'none' } : { display: 'block' }}
              onClick={toggleMenu}
            />
          </div>
        )}
      </div>
      <div className={withShadow ? '' : 'div-header-menu-list'}>
        <ul className={showMenu && showingMenu ? 'header-menu-list showing' : 'header-menu-list'}>
          {navLinks.map((link) => (
            <li
              className="nav-link"
              onClick={() => navigate(`${link.path}`)}
              key={link.path}
            >
              {link.title}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
