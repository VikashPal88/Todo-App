import React, { useEffect, useState, useCallback } from 'react'
import './addtodo.css'

function AddTodo() {
    let [todos, setTodos] = useState([])
    let [inputValue, setInputValue] = useState("")


    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
        if (storedTodos) {
            setTodos(storedTodos)
        }
    }, [])


    const addTodo = () => {
        if (inputValue.trim() === "") {
            alert("Please Enter a Todo");
            return;
        }

        const newTodo = {
            text: inputValue,
            showCheckIcon: false,
        };

        setTodos(prevTodos => [newTodo, ...prevTodos]);
        localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
        setInputValue("");
    }



    function checkTodo(index) {
        let updatedTodos = [...todos];
        updatedTodos[index].showCheckIcon = !updatedTodos[index].showCheckIcon;
        setTodos(updatedTodos);
        saveTodo()
    }


    function editTodo(e, index) {
        let td = [...todos];
        setInputValue(td[index].text)
        td.splice(index, 1)
        setTodos(td)
        saveTodo()
    }

    function deleteTodo(index) {
        let copyTodos = [...todos];
        copyTodos.splice(index, 1)
        setTodos(copyTodos)
        localStorage.setItem('todos', JSON.stringify(copyTodos));
    }




    return (
        <><div className="main-container">
            <h1>Todo App</h1>
            <div className='Add-todos'>
                <input onChange={(e) => setInputValue(e.target.value)} type="text" id='inputTodo' value={inputValue} placeholder='Enter Todo here' />
                <button onClick={addTodo} className='addTodo'>Save</button>
            </div>
            <div className='todos'>
                <ul>
                    <div className='todos'>

                    </div>
                    {
                        todos.map((todo, index) => (

                            <div key={index} className='main-todos-container'>
                                <div className='checkbox'><button onClick={() => checkTodo(index)} >
                                    {
                                        todo.showCheckIcon ? (
                                            <i style={{ color: 'green' }} className="ri-checkbox-circle-line"></i>)
                                            : (
                                                <i className="ri-circle-line" ></i>
                                            )
                                    }
                                </button></div>
                                <div className='allTodos'><li style={{ textDecoration: todo.showCheckIcon ? 'line-through' : 'none' }}>{todo.text}</li></div>
                                <div className='editDelete'>
                                    <button onClick={(e) => editTodo(e, index)}><i className="ri-edit-box-line"></i></button>
                                    <button onClick={() => deleteTodo(index)}><i className="ri-delete-bin-line"></i></button>
                                </div>
                            </div>
                        ))
                    }
                </ul>
            </div >
        </div >


        </>
    )
}

export default AddTodo


{/* <i class="ri-checkbox-circle-line"></i> */ }

{/* <i class="ri-delete-bin-line"></i> */ }


{/* <i class="ri-edit-box-line"></i> */ }