import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import BlogForm from './BlogForm';

const blog = {
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7
};

describe('exercise 5.16', () =>
{
  test('Blog form test', () =>
  {
    const mockHandler = jest.fn();
    const component = render(<BlogForm createBlog={mockHandler} />);
    const form = component.container.querySelector('form');
    console.log(prettyDOM(form));
    const ttitle = component.container.querySelector('#ttitle');
    const tauthor = component.container.querySelector('#tauthor');
    const turl = component.container.querySelector('#turl');
    expect(ttitle).toBeDefined();
    expect(tauthor).toBeDefined();
    expect(turl).toBeDefined();

    fireEvent.change(ttitle, { target: { value: blog.title } });
    fireEvent.change(tauthor, { target: { value: blog.author } });
    fireEvent.change(turl, { target: { value: blog.url } });
    fireEvent.submit(form);

    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(mockHandler.mock.calls[0][0]).toEqual({ ...blog, likes: undefined });
  });
});

