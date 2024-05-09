import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { added, updated } from './employeeSlice';

export const AddEmployeeView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { employeeId } = useParams();
    const employees = useSelector((state) => state.employee.employees);

    const existingEmployee = employees.find(employee => employee.id === Number(employeeId));

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: existingEmployee || {
            name: '',
            birthday: '',
            department: '',
            experience: '',
        }
    });

    const onSubmit = (data) => {
        if (existingEmployee) {
            dispatch(updated({ ...existingEmployee, ...data }));
        } else {
            dispatch(added(data));
        }
        navigate('/');
    };

    return (
        <>
            <div className="container mt-5">
                <h3>{existingEmployee ? "Edit Employee" : "Add Employee"}</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="name">Employee Name</label>
                        <input
                            type="text"
                            className={`form-control ${errors.name && 'is-invalid'}`}
                            id="name"
                            {...register("name", {
                                required: "Employee name is required",
                                pattern: {
                                    value: /^[a-zA-Z]+$/,
                                    message: "Employee name must contain only letters"
                                }
                            })}
                            placeholder="Enter employee name"
                        />
                        {errors.name && (
                            <div className="invalid-feedback">
                                {errors.name.message}
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="birthday">Birth Date</label>
                        <input
                            type="date"
                            className={`form-control ${errors.birthday && 'is-invalid'}`}
                            id="birthday"
                            {...register("birthday", {
                                required: "Birth date is required",
                                validate: value => {
                                    const birthdate = new Date(value);
                                    const today = new Date();
                                    const ageInMilliseconds = today - birthdate;
                                    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
                                    return ageInYears >= 25 || "Employee must be at least 25 years old";
                                }
                            })}
                        />
                        {errors.birthday && (
                            <div className="invalid-feedback">
                                {errors.birthday.message}
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="department">Department</label>
                        <input
                            type="text"
                            className="form-control"
                            id="department"
                            {...register("department", {
                                required: "Department is required"
                            })}
                            placeholder="Enter department"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="experience">Experience</label>
                        <input
                            type="number"
                            className={`form-control ${errors.experience && 'is-invalid'}`}
                            id="experience"
                            {...register("experience", {
                                required: "Experience is required",
                                min: { value: 0, message: "Experience must be 0 or more" },
                                max: { value: 50, message: "Experience must be 50 or less" }
                            })}
                            placeholder="Enter experience (years)"
                        />
                        {errors.experience && (
                            <div className="invalid-feedback">
                                {errors.experience.message}
                            </div>
                        )}
                    </div>

                    <button type="submit" className="btn btn-primary">{existingEmployee ? "Update" : "Add"}</button>
                    <button type="button" className="btn btn-secondary ml-2" onClick={() => navigate('/')}>Cancel</button>
                </form>
            </div>
        </>
    );
};
