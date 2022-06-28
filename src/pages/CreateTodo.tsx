import React, { useState } from "react";
import { CreateTodoInput } from "../API";
import { v4 as uuid } from 'uuid';
import { API, graphqlOperation } from "aws-amplify";
import { createTodo } from "../graphql/mutations";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/css";
import Button, { ButtonType } from "../components/Button";

const initialState = {
  id: uuid(),
  name: 'test',
  description: '',
} as CreateTodoInput;

function CreateTodo() {
  const [todo, setTodo] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onTodoFieldChange = (e: any) => {
    e.preventDefault();
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
    console.log('what', {
      [e.target.name]: e.target.value,
    });
  };

  const saveTodo = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    await API.graphql(graphqlOperation(createTodo, { input: todo }));
    setIsLoading(false);
    navigate('/');
  };

  return (
    <div className={containerStyle}>

      <input
        type="text"
        value={todo.name}
        placeholder="Name"
        name="name"
        onChange={onTodoFieldChange}
        className={inputStyle}
        required
      />
      <input
        type="text"
        value={todo.description || ''}
        placeholder="Description"
        name="description"
        onChange={onTodoFieldChange}
        className={inputStyle}
        required
      />

      {isLoading && <p>Loading...</p>}
      <Button
        onClick={saveTodo}
        disabled={isLoading}
        text="Save Todo"
        type={ButtonType.submit}
      />
    </div>
  );
}

export default CreateTodo;

const containerStyle = css({
  margin: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});

const inputStyle = css({
  outline: 'none',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '3px',
  margin: '10px'
});

