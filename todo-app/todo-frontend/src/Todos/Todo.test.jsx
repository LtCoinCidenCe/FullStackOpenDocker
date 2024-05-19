import { render, screen } from '@testing-library/react'
import Todo from './Todo'
import { describe, expect, test } from 'vitest'

const singleTodo = { text: 'testing Todo', done: false }


test('test Todo', () => {
  render(<Todo todo={singleTodo} />)
  const element = screen.getByText(singleTodo.text);
  const element2 = screen.getByText('Set as undone');
  expect(element).toBeDefined();
  expect(element2).toBeDefined();
})
