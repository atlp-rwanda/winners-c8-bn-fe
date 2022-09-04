import { FETCH_ALL_CHATS, FETCH_ALL_CHATS_FAILED, CHAT_SUCCESS, CHATTING_STATUS } from "../actions/actionTypes";

const initialState = {}

export default function(state= initialState, action){
    const { type, payload } = action;
    switch(type) {
        case FETCH_ALL_CHATS:
            return {
                ...state,
                chats: payload.chats
            };

        case FETCH_ALL_CHATS_FAILED:
            return {
                ...state,
                chats: payload
            };
        case CHAT_SUCCESS:
            return{
                ...state,
                isChatSent: true
            }
        case CHATTING_STATUS:
            return{
                ...state,
                isChatting: true
            }    
            default:
                return state;
                

    }
}