import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';
import './Todo.css';

const Todo = () => {
	const localhost = 'https://simple-todo-mx.herokuapp.com/todo/';
	const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  
  useEffect(() => {
    axios.get(localhost, {
      headers: {
        'token':localStorage.getItem('x-token')
      }
    }).then(response => {
      const { data: { todos }} = response;	
      setTodos(todos);
    }).catch(err => console.log(err))
  }, []);
  
  const addTodo = () => {
    axios.post(localhost, {text}, {
      headers: {
        'token':localStorage.getItem('x-token')
      }
    }).then(response => {
      //console.log(response);
      setTodos([...todos, response.data.todo]);
      setText("");
    }).catch(err => console.log(err));
  }

  const deleteTodo = (id) => {
    axios.delete(localhost + `${id}`, {
      headers: {
        'token':localStorage.getItem('x-token')
      }
    }).then(res => {
      console.log(res);
      setTodos(todos.filter((todo) => {
        return todo._id !== id;
      }))
    }).catch(err => console.log(err));
  }
  const completeTodo = (id, isComplete) => {
    axios.patch(localhost + `${id}`, {text, isComplete},{
      headers: {
        'token':localStorage.getItem('x-token')
      }
    }).then(res => {
      setTodos(todos.map(todo => {
        if(todo._id === id)
          todo.isComplete = !todo.isComplete;
        return todo;
      }));
    }).catch(err => console.log(err));
  }
  
  const saveTodo = (id, isComplete) => {
    const updatedText = document.getElementById(id).value;
    axios.patch(localhost + `${id}`, {text:updatedText, isComplete},{
      headers: {
        'token':localStorage.getItem('x-token')
      }
    }).then(res => {
      console.log(res);
      setTodos(todos.map(todo => {
        if(todo._id === id)
          todo.text = updatedText;
        return todo;
      }));
    }).catch(err => console.log(err));
  }

  const logOut = () => {
    localStorage.removeItem('x-token');
    
  }

  return (
    <div className="todo-container">
      <div className="top-section">
        <input type="text" value={text} onChange={e => setText(e.target.value)}/>
        <button onClick={addTodo}>Add todo</button>
      </div>
      <div className="bottom-section">
        {
          todos.map(todo => 
          <div key={todo._id} className="todo">
            <div className={todo.isComplete ? 'line completed' : 'line'}></div>
            <div className="text-div">
              <input type="text" id={todo._id} defaultValue={todo.text} /> 
            </div>
            <div className="btns">
              <button onClick={() => {deleteTodo(todo._id)}}>
                <FontAwesomeIcon icon={faTrash} size={'lg'} />
              </button>
              <button onClick={() => { completeTodo(todo._id, !todo.isComplete)}}>
                <FontAwesomeIcon icon={faCheck} size={'lg'} />
              </button>
              <button onClick={() => { saveTodo(todo._id, todo.isComplete) }}>
                <FontAwesomeIcon icon={faEdit} size={'lg'}/>
              </button>
            </div>
          </div>)
        }
      </div>
      <button className="log-out" onClick={logOut}>
        <Link to="/">Log out</Link>
      </button>
    </div>
  );
}

export default Todo;