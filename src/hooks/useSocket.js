import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { successToast } from '../helpers/generateToast';
import {
  SET_USER_ONLINE_STATUS,
  ADD_NOTIFICATION,
} from '../redux/types/notificationTypes';
const socket = io(process.env.BACKEND_SERVER_URL, {
  transports: ['websocket'],
  auth: {
    token: localStorage.getItem('auth-token'),
  },
});
const notificationSound = document.createElement('audio');
notificationSound.src = '/sounds/notification.mp3';

const useSocket = () => {
  const dispatch = useDispatch();
  const onlineStatus = useSelector((state) => state.onlineStatus);
  useEffect(() => {
    socket.on('disconnect', () => {
      dispatch({ type: SET_USER_ONLINE_STATUS, payload: false });
    });
    socket.on('online', () => {
      dispatch({ type: SET_USER_ONLINE_STATUS, payload: true });
    });
    socket.on('notification', (data) => {
      notificationSound.play();
      successToast(data?.message);
      dispatch({
        type: ADD_NOTIFICATION,
        payload: Object.assign({}, data?.notification, {
          associatedUser: data?.associatedUser,
        }),
      });
    });
  }, []);

  return { socket, onlineStatus };
};
export default useSocket;
