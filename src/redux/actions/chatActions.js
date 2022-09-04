import { FETCH_ALL_CHATS, FETCH_ALL_CHATS_FAILED, CHAT_SUCCESS, CHATTING_STATUS } from './actionTypes';


const URL = 'http://localhost:6001/users/chats';

export const getAllChats = () => async (dispatch) => {
  try {
    const response = await axios.get(URL);
    if (response.data.status === 200) {
      dispatch({
        type: FETCH_ALL_CHATS,
        payload: { chats: response.data.chats },
      });
    }
  } catch (err) {
    dispatch({
      type: FETCH_ALL_CHATS_FAILED,
      payload: 'failed to load chats',
    });
  }
};

export const chatSent =() => async (dispatch)=>{
  dispatch({
          type: CHAT_SUCCESS,
  })
}

export const typingStatus =()=> async (dispatch)=>{
  dispatch({
    type: CHATTING_STATUS
  })
}