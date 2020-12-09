import { useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { 
    Container,
    Form,
    Header,
    Segment,
} from 'semantic-ui-react'

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
        return (
            <TodoItem 
                key={todo.id}
                id={todo.id}
                text={todo.text} 
                isComplete={todo.isComplete} 
                handleTodoChange={handleTodoChange}
                onRemoveHandler={onRemoveHandler}
            />
        );
    });

    return (
        <Container style={{backgroundColor: 'white'}}>
            <Header 
                size="huge"
                textAlign="center"
                style={{margin: 10}}
            >To Do</Header>
            <Segment.Group style={{overflow: 'auto', maxHeight: 300}}>
                { todosJSX }
            </Segment.Group>
            <TodoInputForm 
                inputText={inputText}
                onInputChangeHandler={onInputChangeHandler}
                onSubmitHandler={onSubmitHandler}
            />
        </Container>
    );
}

function TodoInputForm(props) {
    return (
        <Form>
            <Form.Group>
                <Form.Input 
                    fluid 
                    placeholder="Type todo..." 
                    onChange={props.onInputChangeHandler}
                    value={props.inputText} 
                    width={12}
                />
                <Form.Button 
                    onClick={props.onSubmitHandler}
                    width={2}
                >Add Todo</Form.Button>
            </Form.Group>
        </Form>
    );
}

function TodoItem(props) {
    return (
        <Segment vertical>
            <Form style={{marginLeft: 20, marginTop: 10}}>
                <Form.Group>
                    <Form.Checkbox 
                        label={props.text}
                        checked={props.isComplete}
                        onChange={(event) => props.handleTodoChange(props.id)}
                        width={12}
                    />
                    <Form.Button 
                        basic
                        content="Remove"
                        color="red"
                        onClick={(event) => props.onRemoveHandler(props.id)}
                        width={2}
                    />
                </Form.Group>
            </Form>
        </Segment>
    );
}
