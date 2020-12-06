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

    const handleChange = (id) => {
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

    return (
        <div className="TodoContainer">
            <h1 className="TodoHeader">To Do</h1>
            <div className="TodoList">
                {
                    todos.map(todo => {
                        return <TodoItem 
                            key={todo.id}
                            id={todo.id}
                            text={todo.text} 
                            isComplete={todo.isComplete} 
                            handleChange={handleChange}
                        />
                    })
                }
            </div>
        </div>  
    );
}

function TodoItem(props) {
    return (
        <div className="TodoItem">
            <input 
                type="checkbox"
                checked={props.isComplete}
                onChange={(event) => props.handleChange(props.id)}
            />
            <p>{props.text}</p>
        </div>
    );
}