export function registration(state={}, action){
    switch (action.type) {
        case 'REGISTER_USER':
        return { 
            ...state,
            registering: true,
        };

        case 'FAILURE':
        return { 
            ...state,
            registering: false,

        };

        case 'USER_EXIST':
        return {
            ...state,
            registering: false
        };

        case 'SUCCESS':
        return { 
            ...state,
            registering: false,
        };

        default:
        return state
    }

}
