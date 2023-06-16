import React from 'react';

const PostForm = ({ newPost, categories, handleInputChange, createPost }) => {
  return (
    <form className="newpost-form" onSubmit={createPost}>
      <div className="newpost-title">
        <label>Título:</label>
        <input className='newpost-title-input' type="text" name="title" value={newPost.title} onChange={handleInputChange} />
      </div>
      <div className="newpost-content">
        <label>Conteúdo:</label>
        <textarea className='newpost-content-textarea' name="content" value={newPost.content} onChange={handleInputChange}></textarea>
      </div>
      <div className="newpost-category">
        <label>Categoria:</label>
        <select name="category_id" value={newPost.category_id} onChange={handleInputChange}>
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
  );
};

export default PostForm;
