import React,{ useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { deleted } from "./employeeSlice";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';

export const EmployeeView = () => {
    const navigate = useNavigate();
    const employees = useSelector((state) => state.employee.employees)
    const dispatch = useDispatch()

    const [showModal, setShowModal] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);

    // Open the modal and set the employee ID to delete
    const handleDeleteClick = (employeeId) => {
        setEmployeeToDelete(employeeId);
        setShowModal(true);
    };

    // Confirm the deletion and close the modal
    const handleConfirmDelete = () => {
        dispatch(deleted(employeeToDelete));
        setShowModal(false);
        setEmployeeToDelete(null);
    };

    // Cancel the deletion and close the modal
    const handleCancelDelete = () => {
        setShowModal(false);
        setEmployeeToDelete(null);
    };

    const handleUpdate = (employeeId) => {
        navigate(`/employee/edit/${employeeId}`);
    };

    return  (
        <div className="container mt-5">
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Birth Date</th>
                        <th>Department</th>
                        <th>Experience</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={employee.id || index}> 
                            <td>{employee.name}</td>
                            <td>{employee.birthday}</td>
                            <td>{employee.department}</td>
                            <td>{employee.experience}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm"
                                    onClick={() => handleUpdate(employee.id)}
                                >
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDeleteClick(employee.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-success" onClick={() => navigate('/employee/add')}>
                Add
            </button>
            <Modal show={showModal} onHide={handleCancelDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this employee?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelDelete}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}