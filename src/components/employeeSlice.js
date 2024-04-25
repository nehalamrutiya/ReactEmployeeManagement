import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // Current employee details
    currentEmployee: {
        name: '',
        birthday: '',
        department: '',
        experience: '',
    },
    // List of employees
    employees: [],
    nextId: 1,
}
const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers:{
        defaultemp: (state, action) => {
            state.currentEmployee = action.payload;
        },
        added: (state,action) =>{
            const newEmployee = {
                id: state.nextId, 
                ...action.payload,
            };
            state.employees.push(newEmployee);
            state.nextId += 1;
        },
        updated: (state, action) => {
            const index = state.employees.findIndex(
                (employee) => employee.id === action.payload.id
            );
            if (index !== -1) {
                state.employees[index] = {
                    ...state.employees[index],
                    ...action.payload,
                };
            }
        },
        deleted: (state, action) =>{
            state.employees = state.employees.filter(
                (employee) => employee.id !== action.payload
            );
        },
    }
})

export default employeeSlice.reducer
export const{defaultemp, added, updated,deleted} = employeeSlice.actions