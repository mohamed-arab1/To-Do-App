import React, {useState, useEffect, useRef} from 'react'

function TodoForm(props) {

    const [input, setInput] = useState(props.edit? props.edit.value : "");

    const inputRef = useRef(null);

    useEffect(()=>{
        inputRef.current.focus();
    })
    const handleSubmit = e => {
        e.preventDefault();
        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input
        })
        setInput("")
    }
    const handleChange = e => {
        setInput(e.target.value);
    }
    return (
        <form className='todo-form' onSubmit={handleSubmit}>
            {
                props.edit ? (
                    <>
                        <input type="text" value={input} className="todo-input edit" name='text' placeholder='Update' onChange={handleChange} ref={inputRef}/>
                        <button className='todo-button edit'>update</button>
                    </>
                ) :
                (   
                <>
                    <input type="text" value={input} className="todo-input" name='text' placeholder='Add To Do.' onChange={handleChange} ref={inputRef}/>
                    <button className='todo-button'>Add</button>
                </>
                )
            }
        </form>
    )
}

export default TodoForm