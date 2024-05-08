import { configureStore } from '@reduxjs/toolkit'
import employeeReducer from '../components/employeeSlice'
import localStorageMiddleware from '../components/localStorageMiddleware';

// Load state from local storage (if any)
const loadStateFromLocalStorage = () => {
    const savedState = localStorage.getItem('employeeState');
    if (savedState) {
        return { employee: JSON.parse(savedState) };
    }
    return undefined;
};

const initialState = loadStateFromLocalStorage();

const store = configureStore({
    reducer:{
        employee: employeeReducer,
    },
    preloadedState:initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
})

export default store