// this folder will contain redux's reducers
import {
  accommodationsReducer,
  AccommodationUpdateReducer,
  deleteAccommodationReducer,
  viewAccommodationReducer,
} from './accommodationReducers';
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import navbarReducer from './navbarReducer';
import notificationReducer from './notificationReducer';
import { registration } from './userReducers';
import { alert } from './alertReducers';
import {
  requestComments,
  postRequestCommentReducer,
  deleteRequestCommentReducer,
} from './requestReducer';
import resetReducer from './resetReducer';
import recoverReducer from './recoverReducer';
import userReducer from './SocialReducers';
import usersReducer from './UserReducer';
import { rolesReducer, assignRoleReducer } from './RoleReducer';
import requestsReducer from './requestReducer';
import {managers, assign_manager} from './assignManagerReducers'
import {
  fetchUserProfileReducer,
  updateUserProfileReducer,
  onlineStatusReducer,
} from './userProfileReducer';
import { statsReducer, chartStatsReducer } from './tripstatsReducers';
import PopularDestinationsReducer from './popularDestinationsReducer';

import { logoutReducer } from './logoutReducer';

export default combineReducers({
  auth: authReducer,
  navbar: navbarReducer,
  requestComments,
  postComment: postRequestCommentReducer,
  deleteComment: deleteRequestCommentReducer,
  userProfile: fetchUserProfileReducer,
  updateUserProfile: updateUserProfileReducer,
  registration,
  alert,
  reset: resetReducer,
  recover: recoverReducer,
  user: userReducer,
  accommodations: accommodationsReducer,
  updatingAccomodation: AccommodationUpdateReducer,
  deletingAccommodation: deleteAccommodationReducer,
  viewAccommodation: viewAccommodationReducer,
  users: usersReducer,
  roles: rolesReducer,
  assignRole: assignRoleReducer,
  logout: logoutReducer,
  tripStats: statsReducer,
  chartTripStats: chartStatsReducer,
  managers,
  assignManager: assign_manager,
  notification: notificationReducer,
  onlineStatus: onlineStatusReducer,
  PopularDestinations: PopularDestinationsReducer,
  requests: requestsReducer,
});
