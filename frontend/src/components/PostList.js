import React from 'react';
import '../styles/Post.css';

const PostList = ({ posts, navigate }) => {
  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div className="posts-box">
      {posts.map((post) => (
        <div className="post" onClick={() => handlePostClick(post.id)} key={post.id}>
          <h3 className="post-title">{post.title}</h3>
          <p>
            <em>{post.category}</em>
          </p>
          <p className="post-content">{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
