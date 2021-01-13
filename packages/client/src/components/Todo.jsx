import React from 'react'
import styled from 'styled-components'

const TodoBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 30px 10px 0;
`

const PinImageBlock = styled.div`
  display: inline-block;
  width: 30px;
  height: 30px;
`

const TodoBodyBlock = styled.div`
  color: #ccc;
  font-weight: 500;
  text-decoration: ${({ textDecoration }) => textDecoration && 'line-through'};
  transition: 1s;
`

const Todo = ({ todo }) => {
  return (
    <TodoBlock>
      <PinImageBlock />
      <TodoBodyBlock textDecoration={todo.isDone}>
        <input type={'checkbox'} checked={todo.isDone} />
        {todo.body}
      </TodoBodyBlock>
    </TodoBlock>
  )
}

export default Todo
