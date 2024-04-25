import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate,useParams } from "react-router-dom";
import { added,updated } from './employeeSlice';

export const AddEmployeeView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { employeeId } = useParams();

    //check for validation
    const [isBirthdateValid, setIsBirthdateValid] = React.useState(true);
    const [isNameValid, setIsNameValid] = React.useState(true);
    const [isExperienceValid, setIsExperienceValid] = React.useState(true);

    const employees = useSelector((state) => state.employee.employees);

    // Check if editing an existing employee
    const existingEmployee = employees.find(employee => employee.id == employeeId);

    const [employee, setEmployee] = React.useState(() => {
        if (existingEmployee) {
            return existingEmployee;
        } else {
            return {
                name: '',
                birthday: '',
                department: '',
                experience: '',
            };
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: value,
        }));

        if (name === 'birthday') {
            validateBirthdate(value);
        }

        if (name === 'name') {
            validateName(value);
        }

        if(name === 'experience'){
            validateExperience(value);
        }
    };

    //validate employee's birthdate 
    const validateBirthdate = (birthdate) => {
        const birthdateObj = new Date(birthdate);
        const today = new Date();

        const ageInMilliseconds = today - birthdateObj;
        const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25); // Approximate conversion

        const isValid = ageInYears >= 25;
        setIsBirthdateValid(isValid);
    };

    //validate employee's name
    const validateName = (name) => {
        const namePattern = /^[a-zA-Z]+$/; // Only letters
        const isValid = namePattern.test(name);
        setIsNameValid(isValid);
    };

    //validate employee's experience
    const validateExperience = (experience) => {
        const experienceValue = parseFloat(experience);
        const isValid = !isNaN(experienceValue) && experienceValue >= 0 && experienceValue <= 50;

        setIsExperienceValid(isValid);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isNameValid) {
            alert('Employee name must contain only letters.');
            return;
        }

        if (!isBirthdateValid) {
            alert('Employee must be at least 25 years old.');
            return;
        }
        if (!isExperienceValid) {
            alert('Experience must be a valid number between 0 and 50 years.');
            return;
        }

        if (existingEmployee) {
            // Dispatch update action if editing an existing employee
            dispatch(updated(employee));
        } else {
            // Dispatch add action if adding a new employee
            dispatch(added(employee));
        }
        navigate('/');
    };
    return(
        <>
            <div className="container mt-5">
            <h3>{existingEmployee ? "Edit Employee" : "Add Employee"}</h3>
            <form onSubmit={handleSubmit}>
           <div className="form-group">
                <label htmlFor="name">Employee Name</label>
                <input
                    type="text"
                    className={`form-control ${!isNameValid && 'is-invalid'}`}
                    id="name"
                    name="name"
                    placeholder="Enter employee name"
                    value={employee.name}
                    onChange={handleChange}
                />
                {!isNameValid && (
                    <div className="invalid-feedback">
                        Employee name must contain only letters.
                    </div>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="birthday">Birth Date</label>
                <input
                    type="date"
                    className={`form-control ${!isBirthdateValid && 'is-invalid'}`}
                    id="birthday"
                    name="birthday"
                    value={employee.birthday}
                    onChange={handleChange}
                />
                {!isBirthdateValid && (
                    <div className="invalid-feedback">
                        Employee must be at least 25 years old.
                    </div>
                )}
                </div>
            <div className="form-group">
                <label htmlFor="department">Department</label>
                <input type="text" 
                className="form-control" 
                id="department"
                name="department"
                placeholder="Enter department" 
                value={employee.department}
                onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="experience">Experience</label>
                <input
                    type="text"
                    className={`form-control ${!isExperienceValid && 'is-invalid'}`}
                    id="experience"
                    name="experience"
                    placeholder="Enter experience (years)"
                    value={employee.experience}
                    onChange={handleChange}
                />
                {!isExperienceValid && (
                    <div className="invalid-feedback">
                        Experience must be a valid number between 0 and 50 years.
                    </div>
                )}
            </div>
            <button type="submit" className="btn btn-primary">{existingEmployee ? "Update" : "Add"}</button>
            <button type="button" className="btn btn-secondary ml-2"
                onClick={() => navigate('/')}>Cancel</button>
            </form>
            </div>
        </>
    );
}