import React from 'react'
import { gql, useQuery } from '@apollo/client'
import Todo from './Todo'

const App = () => {
  const typeDefs = gql`
    query GetTodos {
      todos {
        id
        body
        createdAt
      }
    }
  `

  const { data, loading, error } = useQuery(typeDefs)

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  console.log(data)

  return (
    <div>
      <ul>
        {data.todos.map((todo) => (
          <li key={todo.id}>
            <Todo todo={todo} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
