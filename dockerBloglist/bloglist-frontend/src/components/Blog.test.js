import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

const blog = {
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7
};

describe('exercise 5.13', () =>
{
  test("renders the blog's title and author, not url or number", () =>
  {
    const component = render(
      <Blog blog={blog} />
    );
    expect(component.container).toHaveTextContent(blog.title);
    expect(component.container).toHaveTextContent(blog.author);
    const noURL = component.queryByText(blog.url);
    expect(noURL).toBeNull();
    const noNumber = component.queryByText(/^likes \d+$/); // regex matching like text
    expect(noNumber).toBeNull();
  });
});

describe('exercise 5.14', () =>
{
  test('click shows url and number', () =>
  {
    const component = render(
      <Blog blog={blog} />
    );
    const button = component.getByText('view', { exact: true });
    fireEvent.click(button);

    const URL = component.queryByText(blog.url);
    expect(URL).toBeDefined();
    const number = component.queryByText(/^likes \d+$/); // regex matching like text
    expect(number).toBeDefined();
  });
});

describe('exercise 5.15', () =>
{
  test('double click like button', () =>
  {
    const mockHandler = jest.fn();
    const component = render(
      <Blog blog={blog} handleLike={mockHandler} />
    );
    const viewButton = component.getByText('view', { exact: true });
    fireEvent.click(viewButton);
    const likeButton = component.getByText('like', { exact: true });
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
