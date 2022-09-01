import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice.js'
import { goodsApi } from './goodsApi.js';

export default configureStore({
    reducer: {
        todos: todoReducer,
        [goodsApi.reducerPath]: goodsApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(goodsApi.middleware)
})