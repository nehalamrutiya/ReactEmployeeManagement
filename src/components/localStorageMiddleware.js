const localStorageMiddleware = (store) => (next) => (action) => {
    // Call the next middleware or reducer in the chain
    const result = next(action);

    // Get the updated state after the action has been processed
    const state = store.getState();

    // Save the relevant part of the state to local storage
    localStorage.setItem('employeeState', JSON.stringify(state.employee));

    // Return the result of the action processing
    return result;
};

export default localStorageMiddleware;
