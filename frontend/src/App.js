import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/Navigation.css';
import Home from './pages/Home';
import Users from './pages/Users';
import Login from './pages/Login';
import PostDetails from './pages/Post';
import Register from './pages/Register';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/users" element={<Users />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={NotFound} />
        </Routes>
      </Router>
    </div>
  );
};

const NotFound = () => {
  return <h1>404 - Page Not Found</h1>;
};

export default App;
