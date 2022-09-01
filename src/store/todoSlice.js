import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const setThunkError = (state, action) => {
    state.status = 'rejected'
    state.error = action.payload
}
export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async (_, { rejectWithValue}) => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
            if (!response.ok) {
                throw new Error('Server Error!');
            }
            return await response.json()
        } catch(err) {
            return rejectWithValue(err.message)
        }
    }
)
export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async ({id}, {rejectWithValue, dispatch}) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'DELETE'
            })
            if (!response.ok) {
                throw new Error('Can\'t delete task. Server error')
            }
            return dispatch(removeTodo({id}))
        } catch (err) {
            return rejectWithValue((err.message))
        }
})
export const toggleTodoStatus = createAsyncThunk(
    'todos/toggleTodoStatus',
    async ({id}, {rejectWithValue, dispatch, getState}) => {
        const todo = getState().todos.todos.find((todo) => todo.id === id)
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    completed: !todo.completed
                })
            }, )
            if (!response.ok) {
                throw new Error('Can\'t toggle status. Server error')
            }
            return dispatch(toggleTodoCompleted({id}))
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

export const addNewTodo = createAsyncThunk(
    'todos/addNewTodo',
    async ({title}, {rejectWithValue, dispatch}) => {
    try {
        const todo = {
            title,
            userId: 1,
            completed: false
        }
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo)
        }, )
        if (!response.ok) {
            throw new Error('Can\'t add new task. Server error')
        }
        const data = await response.json();
        return dispatch(addTodo(data))

    } catch(err) {
        return rejectWithValue(err.message)
    }
})

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        status: null,
        error: null
    },
    reducers: {
        addTodo(state, action) {
            state.todos.push(action.payload)
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload.id)
        },
        toggleTodoCompleted(state, action) {
            const toggledIndex = state.todos.findIndex((todo) => todo.id === action.payload.id)
            state.todos[toggledIndex].completed = !state.todos[toggledIndex].completed
        }
    },
    extraReducers: {
        [fetchTodos.pending]: (state) => {
            state.status = 'loading'

        },
        [fetchTodos.fulfilled]: (state, action) => {
            state.status = 'resolved'
            state.todos = action.payload
        },
        [fetchTodos.rejected]: setThunkError,
        [deleteTodo.rejected]: setThunkError
    }
})
const { addTodo, removeTodo, toggleTodoCompleted } = todoSlice.actions

export default todoSlice.reducer