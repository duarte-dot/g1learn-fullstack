import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import '../styles/Home.css'

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', category_id: '' });
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  const fetchPosts = useCallback(async () => {
    try {
      let url = 'http://localhost:8000/api/posts';
      if (selectedCategory) {
        url += `?category_id=${selectedCategory}`;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.log('Listar posts - Erro na requisição', error);
    }
  }, [selectedCategory]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8000/api/categories', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.log('Listar categorias - Erro na requisição', error);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Erro de autorização');
      navigate('/');
    }

    fetchPosts();
    fetchCategories();
  }, [navigate, fetchPosts, fetchCategories]);

  const handleInputChange = (e) => {
    setNewPost((prevPost) => ({ ...prevPost, [e.target.name]: e.target.value }));
  };

  const createPost = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newPost),
      });

      const responseData = await response.json();

      if (responseData.retorno === 'Post criado!') {
        fetchPosts();
        setNewPost({ title: '', content: '', category_id: '' });
        console.log(responseData);
      } else {
        alert('Erro ao criar o post. Verifique os campos e tente novamente.');
      }
    } catch (error) {
      alert('Erro na criação do post');
      console.log('Criar Post - Erro na requisição', error);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <>
      <Navigation />
      <div className='home-page'>
        <h1 className="page-title">Home</h1>
        <h2 className="addnewpost-title">Adicione uma nova discussão</h2>
        <PostForm
          newPost={newPost}
          categories={categories}
          handleInputChange={handleInputChange}
          createPost={createPost}
        />
        <h2 className="discussions-title">Discussões</h2>
        {categories.length > 0 && (
          <div className="category-selector">
            <label>Categoria: </label>
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">Todas as categorias</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <PostList posts={posts} navigate={navigate} />
      </div>
    </>
  );
}
