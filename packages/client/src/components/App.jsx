import React from 'react'
import { gql, useQuery } from '@apollo/client'
import Todo from './Todo'
import CreateTodo from './CreateTodo'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
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
  padding: 20px 0 0;
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
  query GetTodos {
    todos {
      id
      body
      isDone
      createdAt
    }
  }
`

const App = () => {
  const { data, loading, error } = useQuery(GetTodos)

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    <Container>
      <TodoWrapper>
        <TodoMainBlock>
          <CreateTodo />
          <TodoList>
            {data.todos.map((todo) => (
              <li key={todo.id}>
                <Todo todo={todo} />
              </li>
            ))}
          </TodoList>
        </TodoMainBlock>
      </TodoWrapper>
    </Container>
  )
}

export default App
