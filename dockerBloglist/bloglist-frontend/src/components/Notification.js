import React from 'react';
import './Notification.css';
import { Alert } from 'react-bootstrap';

const Notification = ({ message }) =>
{
  if (message !== null)
  {
    if (message.startsWith('e:')) // error
      return <Alert variant='danger'>{message.slice(2)}</Alert>;
    if (message.startsWith('s:')) // success
      return <Alert variant='success'>{message.slice(2)}</Alert>;
  }
  return null;
};

export default Notification;
