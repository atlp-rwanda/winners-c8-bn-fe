import {
  SET_NOTIFICATIONS,
  ADD_NOTIFICATION,
  READ_NOTIFICATION,
  DELETE_NOTIFICATION,
  READ_ALL_NOTIFICATIONS,
} from '../types/notificationTypes';
const initialNoitificatioState = {
  notifications: [],
  unreadNotifications: 0,
};

export default function notificationReducer(
  state = initialNoitificatioState,
  action
) {
  let status = false;
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
        unreadNotifications: action.payload.filter(
          (notification) => notification.status == 'delivered'
        ).length,
      };
    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        unreadNotifications: state.unreadNotifications + 1,
      };
    case READ_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.map((notification) => {
          if (notification.id == action.payload.id)
            return { ...notification, status: 'read' };
          return notification;
        }),
        unreadNotifications: state.unreadNotifications - 1,
      };
    case DELETE_NOTIFICATION:
      const notificationToDelete = state.notifications.find(
        (notification) => notification.id === action.payload.id
      );
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload.id
        ),
        unreadNotifications:
          notificationToDelete.status !== 'read'
            ? state.unreadNotifications - 1
            : state.unreadNotifications,
      };
    case READ_ALL_NOTIFICATIONS:
      return {
        ...state,
        notifications: state.notifications.map((notification) => {
          return { ...notification, status: 'read' };
        }),
        unreadNotifications: 0,
      };
    default:
      return state;
  }
}
