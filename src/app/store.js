import { configureStore } from '@reduxjs/toolkit'
import employeeReducer from '../components/employeeSlice'

const store = configureStore({
    reducer:{
        employee: employeeReducer,
    },
})

export default store