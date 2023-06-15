import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';

export default function PostDetails() {
  const [post, setPost] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [categories, setCategories] = useState('');
  const [editedPost, setEditedPost] = useState({ title: '', content: '', category_id: '' });

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

      if (responseData.retorno !== 'erro') {
        setPost(responseData);
      } else {
        navigate('/home')
        alert(responseData.mensagem);
      }
    } catch (error) {
      console.log('Erro na requisição', error);
    }
  }, [id, navigate]);

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
    const fetchData = async () => {
      await fetchPost();
      await fetchComments();
      await fetchCategories();
    };
  
    fetchData();
  }, [id, fetchPost, fetchComments]);

  const handleEditButton = () => {
    setEditMode(true);
    setEditedPost({
      title: editedPost.title,
      content: editedPost.content,
      category_id: editedPost.category_id,
    });
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
        // Tratar caso de erro na requisição
        console.log('Erro na requisição');
      }
    } catch (error) {
      // Tratar caso de erro na requisição
      console.log('Erro na requisição', error);
    }
  }

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
        // Tratar caso de erro na requisição
        console.log('Erro na requisição');
      }
    } catch (error) {
      // Tratar caso de erro na requisição
      console.log('Erro na requisição', error);
    }
  };

  const handleInputChange = (e) => {
    setEditedPost({ ...editedPost, [e.target.name]: e.target.value });
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
        body: JSON.stringify(editedPost),
      });
  
      const responseData = await response.json();
  
      if (responseData.retorno === 'Post atualizado!') {
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

  if (post) {
  return (
    <div>
      <Navigation />
      <h2>Detalhes do Post</h2>
      {
      editMode ? 
      <form className='newpost-form' onSubmit={updatePost}>
      <div className='newpost-title'>
        <label>Título:</label>
        <input
          type="text"
          name="title"
          value={editedPost.title}
          onChange={handleInputChange}
        />
      </div>
      <div className='newpost-content'>
        <label>Conteúdo:</label>
        <textarea
          name="content"
          value={editedPost.content}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className='newpost-category'>
        <label>Categoria:</label>
        <select
          name="category_id"
          value={editedPost.category_id}
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
    </form> : (
        <div key={post.id}>
          <p>ID: {post.id}</p>
          <p>User: {post.user}</p>
          <p>UserId: {post.user_id}</p>
          <p>Category: {post.category}</p>
          <p>Title: {post.title}</p>
          <p>Content: {post.content}</p>
          <p>Created At: {post.created_at}</p>
          <p>Updated At: {post.updated_at}</p>
          {post.user_id.toString() === localStorage.getItem('user_id') && <button onClick={handleEditButton}>Edit Post</button>}
          {post.user_id.toString() === localStorage.getItem('user_id') && <button onClick={handleDeleteButton}>Delete Post</button>}
        </div>
      )
      }

      <h2>Comentários</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id}>
            <p>User: {comment.user}</p>
            <p>Content: {comment.content}</p>
            <p>Created At: {comment.created_at}</p>
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
}
