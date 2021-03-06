import React, { useState, useRef } from 'react'
import { gql, useMutation } from '@apollo/client'
import styled from 'styled-components'
import { GetTodos } from './App'

const Form = styled.form`
  padding: 0 30px;
`

const Input = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #303030;
  border-radius: 3px;
  background: #343b40;
  box-sizing: border-box;
  padding-left: 10px;
  color: #999;
  font-weight: 700;
  font-size: 16px;
  transition: 0.2s;
  &:focus {
    padding-left: 15px;
    font-size: 19px;
  }
`

const AddTodo = gql`
  mutation AddTodo($body: String!) {
    addTodo(body: $body) {
      id
      body
      isDone
      isPinned
      createdAt
    }
  }
`

const CreateTodo = ({ offset, limit }) => {
  const [value, setValue] = useState('')
  const [addTodo] = useMutation(AddTodo)

  const createInputRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (value.trim()) {
      await addTodo({
        variables: { body: value.trim() },
        refetchQueries: [
          {
            query: GetTodos,
            variables: {
              offset,
              limit
            }
          }
        ]
      })
      setValue('')
      createInputRef.current.blur()
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        ref={createInputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={'Add a task...'}
        required
      />
    </Form>
  )
}

export default CreateTodo
