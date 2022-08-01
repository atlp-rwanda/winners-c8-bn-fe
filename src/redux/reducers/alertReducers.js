export const alert =(state={}, action)=>{
    switch (action.type){
        case 'failure-alert':
        return {
            ...state,
            message_error: action.payload,
        }

        case 'success-alert':
        return {
            ...state,
            message_success: action.payload,
        }

        default:
        return state
    }
    


}