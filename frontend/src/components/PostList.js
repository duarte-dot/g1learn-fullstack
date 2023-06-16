import React from 'react';
import '../styles/Post.css'

const PostList = ({ posts, navigate }) => {
  return (
    <div className="posts-box">
      {posts.map((post) => (
        <div className='post' key={post.id}>
          <h3 className="post-title" onClick={() => navigate(`/posts/${post.id}`)}>
            {post.title}
          </h3>
          <p><em>{post.category}</em></p>
          <p className="post-content">{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
