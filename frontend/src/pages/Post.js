import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';

export default function PostDetails() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [categories, setCategories] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/posts/${id}/comments`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setComments(data);
      } else {
        console.log('Erro na requisição');
      }
    } catch (error) {
      console.log('Erro na requisição', error);
    }
  }, [id]);

  const fetchPost = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const responseData = await response.json();

      if (response.ok) {
        setPost(responseData);
      } else {
        navigate('/home');
        alert(responseData.mensagem);
      }
    } catch (error) {
      console.log('Erro na requisição', error);
    }
  }, [id, navigate]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8000/api/categories', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        alert('Houve um erro ao carregar as categorias');
        console.log('Listar categorias - Erro na requisição');
      }
    } catch (error) {
      alert('Houve um erro ao carregar as categorias');
      console.log('Listar categorias - Erro na requisição', error);
    }
  }, []);

  useEffect(() => {
    fetchPost();
    fetchComments();
    fetchCategories();
  }, [id, fetchPost, fetchComments, fetchCategories]);

  const handleEditButton = () => {
    setEditMode(true);
  };

  const handleDeleteButton = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/posts/${post.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        navigate('/home');
      } else {
        console.log('Erro na requisição');
      }
    } catch (error) {
      console.log('Erro na requisição', error);
    }
  };

  const handleNewCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/api/posts/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ content: newComment }),
      });

      if (response.ok) {
        setNewComment('');
        fetchComments();
      } else {
        console.log('Erro na requisição');
      }
    } catch (error) {
      console.log('Erro na requisição', error);
    }
  };

  const handleInputChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const updatePost = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/api/posts/${post.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(post),
      });

      if (response.ok) {
        fetchPost();
        window.location.reload();
      } else {
        alert('Erro ao criar o post. Verifique os campos e tente novamente.');
      }
    } catch (error) {
      alert('Erro na criação do post');
      console.log('Criar Post - Erro na requisição', error);
    }
  };

  const formatarDataHora = (data) => {
    const dataObj = new Date(data);
    const formatoData = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
  
    const formatoHora = {
      hour: '2-digit',
      minute: '2-digit',
      // second: '2-digit',
    };
  
    const dataFormatada = dataObj.toLocaleDateString('pt-BR', formatoData);
    const horaFormatada = dataObj.toLocaleTimeString('pt-BR', formatoHora);
  
    return `${dataFormatada} às ${horaFormatada}`;
  };
  

  return (
    <div>
      <Navigation />
      {editMode ? (
        <form className="newpost-form" onSubmit={updatePost}>
          <div className="newpost-title">
            <label>Título:</label>
            <input
              type="text"
              name="title"
              value={post?.title || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="newpost-content">
            <label>Conteúdo:</label>
            <textarea
              name="content"
              value={post?.content || ''}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="newpost-category">
            <label>Categoria:</label>
            <select
              name="category_id"
              value={post?.category_id || ''}
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
          <button className="newpost-button" type="submit">
            Criar post
          </button>
        </form>
      ) : (
        post && (
          <div key={post.id}>
            <h1>{post.title}</h1>
            <p>Criado por {post.user}, em {formatarDataHora(post.created_at)}</p>
            <p>Categoria: {post.category}</p>
            <p>{post.content}</p>
            <p>Última atualização: {formatarDataHora(post.updated_at)}</p>
            {post.user_id.toString() === localStorage.getItem('user_id') && (
              <button onClick={handleEditButton}>Edit Post</button>
            )}
            {post.user_id.toString() === localStorage.getItem('user_id') && (
              <button onClick={handleDeleteButton}>Delete Post</button>
            )}
          </div>
        )
      )}

      <h2>Comentários</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id}>
            <p><strong>{comment.user}</strong>, {formatarDataHora(comment.created_at)}</p>
            <p>{comment.content}</p>
          </div>
        ))
      ) : (
        <p>Sem comentários</p>
      )}

      <h2>Adicionar Comentário</h2>
      <form onSubmit={handleNewCommentSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Digite seu comentário..."
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
