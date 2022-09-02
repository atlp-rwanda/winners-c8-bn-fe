import { successToast, errorToast } from '../../helpers/generateToast';
import axiosInstance from '../../helpers/http';
import { FETCH_MANAGERS ,FETCH_MANAGERS_FAILED, ASSIGN_MANAGER ,ASSIGN_MANAGER_FAILED } from './actionTypes'


  export const fetchManagers = () => async (dispatch) => {
    return await 
    axiosInstance.get('/users/managers')
      .then((res) => {
        dispatch({
          type: FETCH_MANAGERS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: FETCH_MANAGERS_FAILED,
          payload: 'Fetch Managers failed',
        });
      });
      
  };


  export const assignManager = (SelectedEmail, SelectedManager) => async (dispatch) => {
    return await 
    axiosInstance.patch('/users/assignManager',{email: SelectedEmail, managerId: SelectedManager})
      .then((res) => {
        if(res.status == 200){
          dispatch({
            type: ASSIGN_MANAGER,
            payload: res.data,
          });
          successToast(res.data.message)
          dispatch(fetchManagers());

        }else{
          errorToast("Only Admin can do this")
        }
      })
      .catch((err) => {
        dispatch({
          type: ASSIGN_MANAGER_FAILED,
          payload: 'Assigning Manager failed',
        });
      });
      
  };