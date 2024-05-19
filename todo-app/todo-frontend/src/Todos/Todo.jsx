import React from 'react'

const Todo = ({ todo, deleteTodo, completeTodo }) => {
  if (!todo)
    return null;
  const { text, done } = todo;
  const doneInfo = (
    <>
      <span>{done ? 'This todo is done' : 'This todo is not done'}</span>
      <span>
        <button onClick={deleteTodo}> Delete </button>
        {!done ? <button onClick={completeTodo}> Set as done </button> : null}
      </span>
    </>
  )

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70%', margin: 'auto' }}>
      <span>
        {todo.text}
      </span>
      {doneInfo}
    </div>
  )
}

export default Todo
