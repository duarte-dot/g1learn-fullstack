import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', category_id: '' });
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/posts', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      alert('Houve um erro ao carregar os posts');
      console.log('Listar posts - Erro na requisição', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/categories', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

        const data = await response.json();
        setCategories(data);
    } catch (error) {
      alert('Houve um erro ao carregar as categorias')
      console.log('Listar categorias - Erro na requisição', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
      if (!token) {
        alert('Erro de autorização')
        navigate('/');
      }

    fetchPosts();
    fetchCategories();
  }, [navigate]);

  const handleInputChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const createPost = async (e) => {
    e.preventDefault();

    try {
      await fetch('http://localhost:8000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newPost),
      });

        fetchPosts();
        setNewPost({ title: '', content: '', category_id: '' });
    } catch (error) {
      alert('Erro na criação do post');
      console.log('Criar Post - Erro na requisição', error);
    }
  };

  return (
    <div>
      <Navigation />

      <h1 className='page-title'>Home</h1>

      <h2 className='addnewpost-title' >Adicione uma nova discussão</h2>
      <form className='newpost-form' onSubmit={createPost}>
        <div className='newpost-title'>
          <label>Título:</label>
          <input
            type="text"
            name="title"
            value={newPost.title}
            onChange={handleInputChange}
          />
        </div>
        <div className='newpost-content'>
          <label>Conteúdo:</label>
          <textarea
            name="content"
            value={newPost.content}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className='newpost-category'>
          <label>Categoria:</label>
          <select
            name="category_id"
            value={newPost.category_id}
            onChange={handleInputChange}
          >
            <option value="">Selecionar uma categoria</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button className='newpost-button' type="submit">Criar post</button>
      </form>

      <h2 className='discussions-title'>Discussões</h2>
      <div className='posts-box'>
        {
          posts.map((post) => (
            <div key={post.id}>
              <h3 className='post-title' onClick={() => navigate(`/posts/${post.id}`)}>{post.title}</h3>
              <p>{post.category}</p>
              <p className='post-content'>{post.content}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}
