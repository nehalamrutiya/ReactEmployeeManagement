import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotification } from './employeeSlice';

const Notification = () => {
    const dispatch = useDispatch();
    const notification = useSelector((state) => state.employee.notification);

    // Use effect to clear the notification after a few seconds
    useEffect(() => {
        if (notification && notification.type) {
            const timer = setTimeout(() => {
                dispatch(clearNotification());
            }, 3000); // Clear after 3 seconds

            return () => clearTimeout(timer);
        }
    }, [notification, dispatch]);

    if (!notification || !notification.type) return null;

    return (
        <div role="alert" className={`alert alert-primary notification ${notification.type}`}>
            {notification.message}
        </div>
    );
};

export default Notification;