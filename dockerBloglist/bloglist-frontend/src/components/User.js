import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, ListGroup } from 'react-bootstrap';

const User = ({ user }) =>
{
  const history = useHistory();
  if (user)
  {
    const html = <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ListGroup variant='flush'>
        {user.blogs.map(blog => <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>)}
      </ListGroup>
      <Button onClick={() => history.push('/users')}>back</Button>
    </div>;
    return html;
  }
  else
    return null;
};

export default User;
