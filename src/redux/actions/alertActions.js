
export const successAlert = (message) => {
    return {
        type: 'success-alert',
        payload: message
    }
    
};


export const failureAlert = (message) => {
    return {
        type: 'failure-alert',
        payload: message
    }
    // return toast.error(`${message}`, {
    //     position: toast.POSITION.TOP_RIGHT
    // })
};
