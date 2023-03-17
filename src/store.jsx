import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/slices/authSlice'
import messageReducer from './redux/slices/messageSlice';

const reducer = {
    auth: authReducer,
    message: messageReducer
}

const store = configureStore({
    reducer: reducer,
    devTools: true,
})

export default store;