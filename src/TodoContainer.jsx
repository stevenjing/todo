import { useState } from 'react';

const todoData = [
    {
        id: 0,
        text: 'Water grass.',
        isComplete: false,
    },
    {
        id: 1,
        text: 'Evening meditation',
        isComplete: false,
    },
    {
        id: 2,
        text: 'Take out the trash.',
        isComplete: false,
    }
];

export default function TodoContainer(props) {
    const [todos, setTodos] = useState(todoData);
    const [inputText, setInputText] = useState('');

    const handleTodoChange = (id) => {
        const todosUpdated = todos.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    isComplete: !todo.isComplete,
                };
            }
            return {...todo};
        });
        setTodos(todosUpdated);
    };

    const onInputChangeHandler = (event) => {
        setInputText(event.target.value);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        const updatedTodos = todos.map(todo => {
            return { ...todo };
        });
        updatedTodos.push({
            id: todos.length,
            text: inputText,
            completed: false,
        });
        setTodos(updatedTodos);
        setInputText('');
    };

    const onRemoveHandler = (id) => {
        const updatedTodos = todos.filter(todo => todo.id !== id).map(todo => {
            return {...todo};
        });
        setTodos(updatedTodos);
    };

    const todosJSX = todos.map(todo => {
        return <TodoItem 
            key={todo.id}
            id={todo.id}
            text={todo.text} 
            isComplete={todo.isComplete} 
            handleTodoChange={handleTodoChange}
            onRemoveHandler={onRemoveHandler}
        />
    });

    return (
        <div className="TodoContainer">
            <h1 className="TodoHeader">To Do</h1>
            <div className="TodoList">
                { todosJSX }
            </div>
            <TodoInput 
                inputText={inputText}
                onInputChangeHandler={onInputChangeHandler}
                onSubmitHandler={onSubmitHandler}
            />
        </div>
    );
}

function TodoInput(props) {
    return (
        <div>
            <form>
                <input 
                    type="text" 
                    placeholder="Type todo..." 
                    onChange={props.onInputChangeHandler}
                    value={props.inputText} 
                />
                <button onClick={props.onSubmitHandler}>Add Todo</button>
            </form>
        </div>
    );
}

function TodoItem(props) {
    return (
        <div className="TodoItem">
            <input 
                type="checkbox"
                checked={props.isComplete}
                onChange={(event) => props.handleTodoChange(props.id)}
            />
            <p>{props.text}</p>
            <button onClick={(event) => props.onRemoveHandler(props.id)}>Remove</button>
        </div>
    );
}
