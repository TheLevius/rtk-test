import { useState, useEffect } from 'react'
import './App.css'
// import TodoList from './components/TodoList.jsx';
// import InputField from './components/InputField.jsx';
import {useDispatch, useSelector} from 'react-redux';
import { addNewTodo, fetchTodos } from './store/todoSlice.js';
import {useAddProductMutation, useGetGoodsQuery, useDeleteProductMutation } from './store/goodsApi.js'

const App = () => {
    // const [text, setText] = useState('')
    // const {status, error} = useSelector((state) => state.todos)
    const [count, setCount] = useState('')
    const [newProduct, setNewProduct] = useState('')
    const { data = [], isLoading} = useGetGoodsQuery(count)
    const [addProduct, addProductInfo] = useAddProductMutation()
    const [deleteProduct, deleteProductInfo] = useDeleteProductMutation()
    const dispatch = useDispatch()

    const handleAddProduct = async () => {
        if (newProduct) {
            await addProduct({ name: newProduct }).unwrap()
            setNewProduct('')
        }
    }
    const handleDeleteProduct = async (id) => {
        await deleteProduct(id).unwrap()

    }
    // const addTask = () => {
    //     dispatch(addNewTodo({ title: text }))
    //     setText('')
    // }

    useEffect(() => {
        // dispatch(fetchTodos())
    }, [dispatch])

    if (isLoading) {
        return <h1>Loading...</h1>
    }
    return (
        <div className="App">
            <div>
                <input type="text" value={newProduct} onChange={(e) => setNewProduct(e.target.value)}/>
                <button onClick={handleAddProduct}>Add Product</button>
            </div>

            <div>
                <select value={count} onChange={(e) => setCount(e.target.value)}>
                    <option value="">all</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>
            <ul>
                {data.map((item) => (
                    <li
                        key={item.id}
                        onClick={() => handleDeleteProduct(item.id)}
                    >
                    {item.name}
                    </li>
                ))}
            </ul>
            {/*<InputField text={text} handleSubmit={addTask} handleInput={setText}/>*/}
            {/*{ status === 'loading' && <h2>Loading...</h2>}*/}
            {/*{ error && <h2>An error occurred: {error}</h2>}*/}
            {/*<TodoList/>*/}
        </div>
    )
}

export default App
