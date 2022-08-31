import axiosInstance from '../../helpers/http';
import {
  SET_NOTIFICATIONS,
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  READ_NOTIFICATION,
} from '../types/notificationTypes';
export const fetchNotifications = () => async (dispatch) => {
  const response = await axiosInstance.get('/user/notifications');
  if ((response.status = 200)) {
    dispatch({
      type: SET_NOTIFICATIONS,
      payload: response.data.data,
    });
  }
};
export const addNotification = (notification) => async (dispatch) => {
  dispatch({
    type: ADD_NOTIFICATION,
    payload: notification,
  });
};
export const deleteNotification = (notification) => async (dispatch) => {
  const response = await axiosInstance.delete(
    `/user/notifications/${notification.id}`
  );
  if ((response.status = 200)) {
    dispatch({
      type: DELETE_NOTIFICATION,
      payload: notification,
    });
  }
};
export const readNotification = (notification) => async (dispatch) => {
  const response = await axiosInstance.patch(
    `/user/notifications/${notification.id}`
  );
  if ((response.status = 200)) {
    dispatch({
      type: READ_NOTIFICATION,
      payload: notification,
    });
  }
};
