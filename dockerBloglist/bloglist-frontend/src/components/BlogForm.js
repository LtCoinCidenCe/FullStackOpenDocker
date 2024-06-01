import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { clearBlogForm, setAuthorAction, setTitleAction, setURLAction } from '../reducer/blogFormReducer';
import { Form, Button } from 'react-bootstrap';

const BlogForm = ({ createBlog }) =>
{
  const dispatch = useDispatch();
  const values = useSelector(state => state.blogform);

  const handler = (event) =>
  {
    event.preventDefault();
    createBlog(values);
    dispatch(clearBlogForm());
  };

  return (
    <div>
      <h3>create new blog</h3>
      <Form onSubmit={handler}>
        <div>title: <Form.Control id="ttitle" type="text" name="title" value={values.title} onChange={event => dispatch(setTitleAction(event.target.value))} /></div>
        <div>author: <Form.Control id="tauthor" type="text" name="author" value={values.author} onChange={event => dispatch(setAuthorAction(event.target.value))} /></div>
        <div>url: <Form.Control id="turl" type="text" name="url" value={values.url} onChange={event => dispatch(setURLAction(event.target.value))} /></div>
        <div><Button id="submitNewBlog" type="submit" >create</Button></div>
      </Form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
};

export default BlogForm;
