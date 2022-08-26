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
import {requests, requestComments, postRequestCommentReducer, deleteRequestCommentReducer} from './requestReducer';
import resetReducer from './resetReducer';
import recoverReducer from './recoverReducer';
import userReducer from './SocialReducers';
import usersReducer from "./UserReducer";
import { rolesReducer, assignRoleReducer } from "./RoleReducer";
import {
  fetchUserProfileReducer,
  updateUserProfileReducer,
} from './userProfileReducer';


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
  reset: resetReducer,
  recover: recoverReducer,
  user: userReducer,
  accommodations:accommodationsReducer,
  updatingAccomodation:AccommodationUpdateReducer,
  deletingAccommodation:deleteAccommodationReducer,
  viewAccommodation: viewAccommodationReducer,
  users: usersReducer,
  roles: rolesReducer,
  assignRole: assignRoleReducer

});


