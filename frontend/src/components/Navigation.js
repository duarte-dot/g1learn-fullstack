import React from 'react';
import {Link} from 'react-router-dom';

const navLinks = [
  {
    title: 'Home',
    path: '/home'
  },
  {
    title: 'Usuários',
    path: '/users'
  },
]

export default function Navigation () {
  return (
    <nav className='header-menu'>
      <span>G1 Learn - Fórum</span>
      <ul>
        {
          navLinks.map((link, index) => (
            <li key={index}>
              <Link to={link.path}>{link.title}</Link>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}