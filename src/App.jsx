import { React, useState } from 'react'
import { Link, Route, Routes } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import {EmployeeView} from './components/EmployeeView'
import {AddEmployeeView} from './components/AddEmployeeView'
import Notification from './components/Notification';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Notification/>
    <Routes>
        <Route path="/" element={<EmployeeView/>}></Route>
        <Route path="/employee/add" element={<AddEmployeeView/>}></Route>
        <Route path="/employee/edit/:employeeId" element={<AddEmployeeView />} />
        <Route path="*"></Route>
    </Routes>
    </>
  )
}

export default App
