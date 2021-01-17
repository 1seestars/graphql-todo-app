import React from 'react'
import styled from 'styled-components'
import { gql, useMutation } from '@apollo/client'
import { GetTodos } from './App'
import dots from '../assets/dots.jpg'
import pink_pin from '../assets/pink_pin.png'

const TodoBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 30px 10px 0;
  border-bottom: ${({ pinned }) => pinned && `1px solid #313131`};
`

const PinImageBlock = styled.div`
  display: inline-block;
  width: 30px;
  height: 30px;
  background-image: ${({ pinned }) => pinned && `url(${pink_pin})`};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
`

const TodoBodyBlock = styled.div`
  display: flex;
  align-items: center;
  color: #ccc;
  font-weight: 500;
  text-decoration: ${({ decoration }) => decoration && 'line-through'};
  width: 100%;
  word-break: break-word;
  padding-right: 20px;
`

const DropdownContent = styled.div`
  display: none;
  border-radius: 3px;
  position: absolute;
  right: 0;
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  background: #576168;

  & button {
    background: #576168;
    width: 100%;
    border: none;
    border-radius: 3px;
    color: #c4c4c4;
    padding: 6px 16px;
    cursor: pointer;
    display: block;
    font-weight: 600;
  }

  & button:hover {
    background-color: #727d84;
  }
`

const TodoOptions = styled.div`
  display: inline-block;
  position: relative;
  width: 30px;
  height: 30px;
  background-image: url(${dots});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
  &:hover ${DropdownContent} {
    display: block;
  }
`

const Checkmark = styled.input`
  min-width: 22px;
  min-height: 22px;
  opacity: 0.7;
  cursor: pointer;
  margin-right: 10px;
`

const ToggleIsDone = gql`
  mutation ToggleIsDone($id: ID!) {
    toggleIsDone(id: $id) {
      id
    }
  }
`

const RemoveTodo = gql`
  mutation RemoveTodo($id: ID!) {
    removeTodo(id: $id) {
      id
    }
  }
`

const TogglePin = gql`
  mutation TogglePin($id: ID!) {
    togglePin(id: $id) {
      id
      body
      isDone
      isPinned
      createdAt
    }
  }
`

const Todo = ({ todo }) => {
  const [toggleIsDone] = useMutation(ToggleIsDone)
  const [removeTodo] = useMutation(RemoveTodo)
  const [togglePin] = useMutation(TogglePin)

  const handleRemoveTodo = async () =>
    await removeTodo({
      variables: { id: todo.id },
      update(cache, { data: { removeTodo } }) {
        cache.modify({
          fields: {
            todosInfo(existing, { readField }) {
              const newData = existing.data.filter(
                (t) => readField('id', t) !== removeTodo.id
              )
              return {
                ...existing,
                data: newData,
                count: existing.count - 1
              }
            }
          }
        })
      }
    })

  const handleUpdateTodo = async () =>
    await toggleIsDone({
      variables: { id: todo.id },
      update(cache, { data: { toggleIsDone } }) {
        const updatedTodo = gql`
          fragment UpdatedTodo on Todo {
            isDone
          }
        `

        const updatedTodoRef = cache.writeFragment({
          id: cache.identify(toggleIsDone),
          fragment: updatedTodo
        })

        cache.modify({
          fields: {
            todosInfo(existing, { readField }) {
              cache.writeFragment({
                id: cache.identify(toggleIsDone),
                fragment: updatedTodo,
                data: {
                  isDone: !readField('isDone', updatedTodoRef)
                }
              })
              return existing
            }
          }
        })
      }
    })

  return (
    <TodoBlock pinned={todo.isPinned}>
      <PinImageBlock pinned={todo.isPinned} />
      <TodoBodyBlock decoration={todo.isDone}>
        <Checkmark
          type={'checkbox'}
          checked={todo.isDone}
          onChange={handleUpdateTodo}
        />
        {todo.body}
      </TodoBodyBlock>
      <TodoOptions>
        <DropdownContent>
          <button
            onClick={async () =>
              await togglePin({
                variables: { id: todo.id },
                refetchQueries: [{ query: GetTodos }]
              })
            }
          >
            {todo.isPinned ? 'Unpin' : 'Pin on the top'}
          </button>
          <button onClick={handleRemoveTodo}>Delete</button>
        </DropdownContent>
      </TodoOptions>
    </TodoBlock>
  )
}

export default Todo
