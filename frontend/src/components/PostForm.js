import React from 'react';

const PostForm = ({ newPost, categories, handleInputChange, createPost }) => {
  const { title, content, category_id } = newPost;

  return (
    <form className="newpost-form" onSubmit={createPost}>
      <div className="newpost-title">
        <label htmlFor="title">Título:</label>
        <input
          className="newpost-title-input"
          maxLength="45"
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleInputChange}
        />
      </div>
      <div className="newpost-content">
        <label htmlFor="content">Conteúdo:</label>
        <textarea
          className="newpost-content-textarea"
          id="content"
          name="content"
          value={content}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className="newpost-category">
        <label htmlFor="category">Categoria:</label>
        <select
          id="category"
          name="category_id"
          value={category_id}
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
  );
};

export default PostForm;
