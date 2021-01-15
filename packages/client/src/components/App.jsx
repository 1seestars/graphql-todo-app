import React from 'react'
import { gql, useQuery } from '@apollo/client'
import Todo from './Todo'
import CreateTodo from './CreateTodo'
import styled from 'styled-components'
import Loader from './Loader'
import Error from './Error'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 10px;
  box-sizing: border-box;
  background: rgb(240, 98, 146);
  background: linear-gradient(
    165deg,
    rgba(240, 98, 146, 1) 50%,
    rgba(230, 93, 138, 1) 50%
  );
  background-repeat: no-repeat;
  min-height: 100vh;
`

const TodoWrapper = styled.div`
  background: #3c434a;
  width: 100%;
  max-width: 800px;
  min-height: 400px;
  align-self: center;
  border-radius: 7px;
  box-shadow: 0 0 30px 0 rgba(51, 51, 51, 0.7);
  padding: 20px 0 20px;

  -webkit-animation-name: zoomIn;
  animation-name: zoomIn;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;

  @-webkit-keyframes zoomIn {
    0% {
      opacity: 0;
      -webkit-transform: scale3d(0.8, 0.8, 0.8);
      transform: scale3d(0.8, 0.8, 0.8);
    }
    50% {
      opacity: 1;
    }
  }
  @keyframes zoomIn {
    0% {
      opacity: 0;
      -webkit-transform: scale3d(0.8, 0.8, 0.8);
      transform: scale3d(0.8, 0.8, 0.8);
    }
    50% {
      opacity: 1;
    }
  }
`

const TodoMainBlock = styled.div`
  padding: 7% 0 0;
  text-align: center;
  width: 90%;
  margin: 0 auto;
`

const TodoList = styled.ul`
  list-style: none;
  text-align: left;
  padding: 0;
`

export const GetTodos = gql`
  query GetTodos($offset: Int!, $limit: Int) {
    todosInfo(offset: $offset, limit: $limit) {
      todos {
        id
        body
        isDone
        isPinned
        createdAt
      }
      quantity
    }
  }
`

const App = () => {
  const { data, loading, error, fetchMore } = useQuery(GetTodos, {
    variables: {
      offset: 0
    }
  })

  console.log(data)

  const todos = (data && data.todosInfo.todos) || []

  let componentInner = (
    <TodoWrapper>
      <TodoMainBlock>
        <CreateTodo />
        <TodoList>
          {todos.map((todo) => (
            <li key={todo.id}>
              <Todo todo={todo} />
            </li>
          ))}
        </TodoList>
        <button
          onClick={() =>
            fetchMore({
              variables: {
                offset: 10
              }
            })
          }
        >
          Next
        </button>
      </TodoMainBlock>
    </TodoWrapper>
  )

  if (error) componentInner = <Error message={error.message} />
  if (loading) componentInner = <Loader />

  return <Container>{componentInner}</Container>
}

export default App
