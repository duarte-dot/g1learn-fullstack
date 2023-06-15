import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';

export default function PostDetails() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { id } = useParams();

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
        // Tratar caso de erro na requisição
        console.log('Erro na requisição');
      }
    } catch (error) {
      // Tratar caso de erro na requisição
      console.log('Erro na requisição', error);
    }
  }, [id]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPost(data);
        } else {
          // Tratar caso de erro na requisição
          console.log('Erro na requisição');
        }
      } catch (error) {
        // Tratar caso de erro na requisição
        console.log('Erro na requisição', error);
      }
    };

    fetchPost();
    fetchComments(); // Fetch comments when component mounts
  }, [id, fetchComments]);

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
        fetchComments(); // Fetch comments again to update the state with the new comment
      } else {
        // Tratar caso de erro na requisição
        console.log('Erro na requisição');
      }
    } catch (error) {
      // Tratar caso de erro na requisição
      console.log('Erro na requisição', error);
    }
  };

  return (
    <div>
      <Navigation />
      <h2>Detalhes do Post</h2>
      {post ? (
        <div key={post.id}>
          <p>ID: {post.id}</p>
          <p>User: {post.user}</p>
          <p>Category: {post.category}</p>
          <p>Title: {post.title}</p>
          <p>Content: {post.content}</p>
          <p>Created At: {post.created_at}</p>
          <p>Updated At: {post.updated_at}</p>
        </div>
      ) : (
        <p>Carregando...</p>
      )}

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
