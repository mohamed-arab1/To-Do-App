import React, {useState, useEffect} from 'react'
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList() {
    const [todos, setTodos] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) :[]);

    useEffect(()=>{
        localStorage.setItem("todos", JSON.stringify(todos))
    },[todos]);

    const addToDo = todo => {

        if(!todo.text || /^\s*$/.test(todo.text)){
            return
        }

        const newTodo = [todo, ...todos];
        setTodos(newTodo);
    }

    
    const updateTodo = (todoId, newValue) => {
        if(!newValue.text || /^\s*$/.test(newValue.text)){
            return
        };

        setTodos(prev =>  prev.map(item =>  item.id === todoId ? newValue : item ));

        
    }

    const completeTodo = id =>{
        let updating = todos.map(todo => {
            if(todo.id === id){
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        })
        setTodos(updating);
    }
    const removeTodo = id =>{
        const removeTodos = [...todos].filter(todo => todo.id !== id);
        setTodos(removeTodos);
    }
    return (
        <div>
            <h1>What's the plan for today?</h1>
            <TodoForm onSubmit={addToDo} />
            <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo} />
        </div>
    )
}

export default TodoList