import { userService } from '../../services/userServices';
import { successAlert, failureAlert} from './alertActions';
import { createBrowserHistory } from 'history';
import {useNavigate} from "react-router-dom";

const history = createBrowserHistory();

function register(user) {
    
    return dispatch => {
        
            dispatch({
                type: 'REGISTER_USER',
                payload:user
            });
        
        
        userService.register(user)
            .then(res => {
                if(res.error){
                    dispatch({
                        type: 'FAILURE',
                        payload: res.error.toString()
                    })
                    dispatch(failureAlert(res.error.toString()))
                }
                if(res.message === 'Ooops! User already exists!'){
                    dispatch({
                        type: 'USER_EXIST',
                        payload: res.message.toString()
                    })
                    dispatch(failureAlert(res.message.toString()))

                }
                if(res.success && res.status === 201){
                    dispatch({
                        type: 'SUCCESS',
                        payload: res
                    })
                    dispatch(successAlert('Registration successful'));

                    // adding registration token in localstorage for future user verification
                    localStorage.setItem('reg-token', JSON.stringify(res.data))
                    history.push('/login')
                    

                }
                
            }
                
            )
            .catch(err =>{
                dispatch({
                    type: 'FAILURE',
                    payload: err.toString()
                })
                dispatch(failureAlert(err.toString()))
            })

        //     .then(
        //         response => { 
        //             if(response.error) {
        //                 dispatch({
        //                     type: 'FAILURE',
        //                     payload: error.toString()
        //                 })
        //                 console.log('5555555555555', response)
        //                 dispatch(failureAlert(response.error));
                       
        //             }
        //             // else{
        //             dispatch({
        //                 type: 'SUCCESS',
        //                 payload: response
        //             })
                    
        //             dispatch(successAlert('Registration successful'));
                    
        //         // }
        //             // dispatch(success());
        //             // history.push('/login');
        //             // dispatch(alertActions.success('Registration successful'));
        //         },
    
        //         error => {
        //             console.log(error.toString())
        //             dispatch({
        //                 type: 'FAILURE',
        //                 payload: error.toString()
        //             })
        //             // dispatch({
        //             //     type:'failure-alert',
        //             //     payload:failureAlert(error.toString())
        //             // });
        //             dispatch(failureAlert('Failed to fetch this resource'));
        //             // history.push('/register');
        //             // dispatch(alertActions.error(error.toString()));
        //         }
        // );
        // // }, 2000)
    };

    // function request(user) { return { type: 'REGISTER_USER', payload:user } }
    // function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    // function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
    // function failureAlert(error) { return { type: 'failure-alert', payload:error } }
}


export const userActions = {
    register,
};
