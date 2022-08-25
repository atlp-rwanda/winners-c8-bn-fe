import axios from 'axios'
import { successToast, errorToast } from '../../helpers/generateToast';
import { successAlert, failureAlert} from './alertActions';
import { FETCH_ACCOMMODATIONS_LOADING, 
         FETCH_ACCOMMODATIONS_SUCCESS, 
         FETCH_ACCOMMODATIONS_FAILED,
         FETCH_SINGLE_ACCOMMODATION_LOADING,
         FETCH_SINGLE_ACCOMMODATION_SUCCESS,
         FETCH_SINGLE_ACCOMMODATION_FAILED,
         ACCOMMODATION_UPDATE_LOADING,
         ACCOMMODATION_UPDATE_SUCCESS,
         ACCOMMODATION_UPDATE_FAILURE,
         ACCOMMODATION_DELETE_SUCCESS,
         ACCOMMODATION_DELETE_LOADING,
         ACCOMMODATION_DELETE_FAILURE,
         ACCOMMODATION_VIEW_LOADING,
         ACCOMMODATION_VIEW_SUCCESS,
         ACCOMMODATION_VIEW_FAILURE
        } from "./actionTypes";
import {accommodationsUrl} from "../utils/apiUrls";
import axiosInstance from '../../helpers/http';

export const listAccommodations = () => async dispatch => {
    dispatch({
        type: FETCH_ACCOMMODATIONS_LOADING
    });

  return await axiosInstance.get(accommodationsUrl)
      .then(res => {
          dispatch({
              type: FETCH_ACCOMMODATIONS_SUCCESS,
              payload: res.data
          });
      })
      .catch(err => {
          dispatch({
              type: FETCH_ACCOMMODATIONS_FAILED,
              payload: err.message,
              message: err
          });
          errorToast(err.toString())
      })
}


// updating accommodation
export const updateAccommodationRequest = () => {
	return {
		type: ACCOMMODATION_UPDATE_LOADING
	}
}

export const updateAccommodationSuccess = (data)=>{
	return {
		type: ACCOMMODATION_UPDATE_SUCCESS,
		payload: data
	}
}

export const updateAccommodationFailure = (error) => {
	return {
		type: ACCOMMODATION_UPDATE_FAILURE,
		payload: error
	}

}

export const updateAccommodation = (id,accommodation) =>{
	const apiUrl =`${process.env.BASE_BACKEND_SERVER_URL}/accommodations/${id}`
	const formData = new FormData()
	if(accommodation.locationId){
		formData.append('location_id', accommodation.locationId)
	} 
	if(accommodation.accommodationName){
		formData.append('name', accommodation.accommodationName)
	}
	if(accommodation.description){
		formData.append('description', accommodation.description)
	}
    if(accommodation.images){
		formData.append('accommodation_image', accommodation.images)
	}
	if(accommodation.latitude){
		formData.append('latitude', accommodation.latitude)
	}
    if(accommodation.longitude){
		formData.append('longitude', accommodation.longitude)
	}
	
	return  async (dispatch) => {
		dispatch(updateAccommodationRequest())
		await axiosInstance.patch(`/accommodations/${id}`, formData)
        .then(response=>{
			dispatch(updateAccommodationSuccess(response.data))
            successToast('updated successfully')
            dispatch(listAccommodations())

		}).catch(error=>{
			dispatch(updateAccommodationFailure(error))
            errorToast(error.toString())
		})
        
	}
}

// deleting accommodation
export const deleteAccommodationRequest = () => {
	return {
		type: ACCOMMODATION_DELETE_LOADING
	}
}

export const deleteAccommodationSuccess = (data)=>{
	return {
		type: ACCOMMODATION_DELETE_SUCCESS,
		payload: data
	}
}

export const deleteAccommodationFailure = (error) => {
	return {
		type: ACCOMMODATION_DELETE_FAILURE,
		payload: error
	}

}

export const deleteAccommodation = (id)=>{
    const apiUrl =`${process.env.BASE_BACKEND_SERVER_URL}/accommodations/${id}`

    return  async (dispatch) => {
		dispatch(deleteAccommodationRequest())
		await axiosInstance.delete(`/accommodations/${id}`)
        .then(response=>{
			dispatch(deleteAccommodationSuccess(response.data))
            if (response.status == 200) {
                successToast('accommodation Deleted successfully')
                dispatch(listAccommodations())
            };
		}).catch(error=>{
			dispatch(deleteAccommodationFailure(error))
            errorToast(error.toString())
		})
        // dispatch(listAccommodations())
	}
}


// viewing accommodation
export const viewAccommodationRequest = () => {
	return {
		type: ACCOMMODATION_DELETE_LOADING
	}
}

export const viewAccommodationSuccess = (data)=>{
	return {
		type: ACCOMMODATION_DELETE_SUCCESS,
		payload: data
	}
}

export const viewAccommodationFailure = (error) => {
	return {
		type: ACCOMMODATION_DELETE_FAILURE,
		payload: error
	}

}

export const viewAccommodation = (id)=>{
    const apiUrl =`${process.env.BASE_BACKEND_SERVER_URL}/accommodations/${id}`

    return  async (dispatch) => {
		dispatch(viewAccommodationRequest())
		await axios.get(apiUrl, {
            headers: authHeader() 
		  }
		).then(response=>{
			dispatch(viewAccommodationSuccess(response.data))
            console.log('data', response.data)
            if (response.status == 200) {
                successToast('accommodation Deleted successfully')
                // dispatch(listAccommodations())
            };
		}).catch(error=>{
			dispatch(viewAccommodationFailure(error))
            console.log('error', error.message)
		})
	}
}




