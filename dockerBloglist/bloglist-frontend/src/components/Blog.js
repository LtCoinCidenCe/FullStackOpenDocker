import React, { useState } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';

const Blog = ({ blog, handleLike, handleRemove, handleComment }) =>
{
  if (!blog)
    return null;
  else
  {
    const displayRemove = () => handleRemove === null ? { display: 'none' } : null;
    const commentsHelper = () =>
    {
      if (blog.comments.length === 0)
        return <div style={{ color: 'grey' }}>no comments</div>;
      else
      {
        const newArray = [];
        for (let index = 0; index < blog.comments.length; index++)
        {
          const comment = blog.comments[index];
          newArray.push({ index, comment });
        }
        return <ListGroup variant='flush'>
          {newArray.map(cmt => <ListGroup.Item key={cmt.index}>{cmt.comment}</ListGroup.Item>)}
        </ListGroup>;
      }
    };
    return (
      <div>
        <h2>{blog.title}</h2>
        <a href={blog.url}>{blog.url}</a>
        <div className="blogLikes">likes {blog.likes}<Button onClick={handleLike}>like</Button></div>
        <div>added by {blog.user.name}</div>
        <div className="removeBlog" style={displayRemove()}><Button onClick={handleRemove}>remove</Button></div>
        <h3>comments</h3>
        <CommentForm handleComment={handleComment} />
        {commentsHelper()}
      </div>);
  }
};

const CommentForm = ({ handleComment }) =>
{
  const [comment, setComment] = useState('');
  const handleSubmit = (event) =>
  {
    event.preventDefault();
    handleComment(comment);
    setComment('');
  };

  return <Form onSubmit={handleSubmit}>
    <Form.Control type='text' name='comment' value={comment} onChange={event => setComment(event.target.value)} />
    <Button type='submit'>create comment</Button>
  </Form>;
};

export default Blog;
