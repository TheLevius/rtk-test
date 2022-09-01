import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, toggleTodoStatus } from '../store/todoSlice.js'

const TodoItem = ({id, title, completed}) => {
    const dispatch = useDispatch()

    return (
        <li key={id}>
            <input type="checkbox" checked={completed} onChange={() => dispatch(toggleTodoStatus({id}))} />
            <span>{title}</span>
            <span className={"deleteTodo"} onClick={() => dispatch(deleteTodo({id}))}>&times;</span>
        </li>
    );
};

export default TodoItem;