// this folder will contain redux's reducers
import {accommodationsReducer, detailsAccommodationReducer, 
  AccommodationUpdateReducer,deleteAccommodationReducer,
  viewAccommodationReducer
}from "./accommodationReducers"
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import navbarReducer from './navbarReducer';
import { registration } from './userReducers';
import { alert } from './alertReducers';
import {requestComments, postRequestCommentReducer, deleteRequestCommentReducer} from './requestReducer';
import requests from './requestReducer'
import resetReducer from './resetReducer';
import recoverReducer from './recoverReducer';
import userReducer from './SocialReducers';
import usersReducer from "./UserReducer";
import chatReducers from './chatReducers';
import { rolesReducer, assignRoleReducer } from "./RoleReducer";
import requestsReducer from './requestReducer'
import {
  fetchUserProfileReducer,
  updateUserProfileReducer,
} from './userProfileReducer';
import { statsReducer, chartStatsReducer } from './tripstatsReducers';
import PopularDestinationsReducer from './popularDestinationsReducer';

import { logoutReducer } from "./logoutReducer";

export default combineReducers({
  auth: authReducer,
  navbar: navbarReducer,
  requests,
  requestComments,
  postComment: postRequestCommentReducer,
  deleteComment: deleteRequestCommentReducer,
  userProfile: fetchUserProfileReducer,
  updateUserProfile: updateUserProfileReducer,
  registration,
  alert,
  chat: chatReducers,
  reset: resetReducer,
  recover: recoverReducer,
  user: userReducer,
  accommodations:accommodationsReducer,
  updatingAccomodation:AccommodationUpdateReducer,
  deletingAccommodation:deleteAccommodationReducer,
  viewAccommodation: viewAccommodationReducer,
  users: usersReducer,
  roles: rolesReducer,
  assignRole: assignRoleReducer,
  logout: logoutReducer,
  tripStats: statsReducer,
  chartTripStats: chartStatsReducer,
  PopularDestinations: PopularDestinationsReducer,
  requests: requestsReducer,
});


