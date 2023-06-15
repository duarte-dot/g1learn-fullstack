import React from 'react';

const PostList = ({ posts, navigate }) => {
  return (
    <div className="posts-box">
      {posts.map((post) => (
        <div key={post.id}>
          <h3 className="post-title" onClick={() => navigate(`/posts/${post.id}`)}>
            {post.title}
          </h3>
          <p>{post.category}</p>
          <p className="post-content">{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
