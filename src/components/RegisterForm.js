import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import "../../public/styles/RegisterForm/index.css"
import { connect } from "react-redux";
import { userActions } from '../redux/actions/userActions';
import {errorToast, successToast, existToast} from "../helpers/generateToast";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class UserRegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confPassword: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.props.alert.message_error= '';
        this.props.alert.message_success= '';
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            ...this.state,
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true});
        const { user } = this.state;
        console.log(user)
        if (user.firstName && user.lastName && user.email && user.password && user.confPassword) {
            if(user.confPassword === user.password){
                this.props.register(user);

                this.setState ({
                    user: {
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        confPassword: ''
                    },
                    submitted: false
                });
            }else{
                errorToast('Passwords need to be the same!')
            }
            
            
        }else{
            errorToast('All fields are required!')
        }
       
            

        
        
        // this.props.register(user);
        // if (user.firstName && user.lastName && user.username && user.password) {
        //     this.props.register(user);
        // }
    }



// //    state = this.props.user

//    state ={
//         firstName:'',
//         lastName:'',
//         email:"",
//         password:"",
//         confPassword:""
//    }

//     handleTextChange= event =>{
//         const {target: {name, value}} = event;
//         this.setState({ [name]: value })
//         console.log(this.state)
//     }

//     // handleFirstName = (event)=>{
//     //     const firstName = event.target.value
//     //     console.log(
            
//     //         firstName
//     //     )
//     //     // console.log(event.target.value)
//     //     // console.log(this.state.firstName)
//     // }


//    handleSubmit = event =>{
//     event.preventDefault()

//     this.props.addNewUser({
        
//     })

//     // console.log(this.state)

//    }
//     // // handleSubmit = event =>{
//     //     event.preventDefault()
//     //     this.props.addUser(this.state)
//     //     this.setState({
//     //         firstName:'',
//     //         lastName:'',
//     //         email:"",
//     //         password:"",
//     //         confPassword:""
//     //     })

//     // }
  render(){
    const { registering, error } = this.props.registration;
    const { user, submitted } = this.state;
    let {message_error, message_success} = this.props.alert;

    return (
        <div className="register-section pt-100 pb-100 md-pt-80 md-pb-80">
       
            <div>
                <>
                <ToastContainer></ToastContainer>
                </>
            </div>

        <div className="registration">
            <div className="register-box">
                <div className="sec-title text-center mb-30">
                    <h5 className="title 200 mb-10">Create New Account.</h5>
                </div>
                {message_error && <p>{errorToast(message_error)}</p> || message_success && <p>{successToast(message_success)}</p>}
                <div className="styled-form">
                    <div id="form-messages"></div>
                    <form id="register-form" method="post" onSubmit={this.handleSubmit}>
                        <div className="row clearfix">
                            <div className="form-group col-lg-12 mb-25">
                                <input type="text" id="Name" name="firstName" className="field" value={user.firstName} onChange={this.handleChange} placeholder="First Name"  />
                            </div>
                            <div className="form-group col-lg-12">
                                <input type="text" id="last" name="lastName" className="field" value={user.lastName} onChange={this.handleChange} placeholder="Last Name"  />
                            </div>
                            <div className="form-group col-lg-12">  
                                <input type="email" id="email" name="email" className="field" value={user.email} onChange={this.handleChange} placeholder="Email address"  />
                            </div>
                            <div className="form-group col-lg-12">
                                <input type="password" id="puser" name="password" className="field" value={user.password} onChange={this.handleChange} placeholder="Password"  />
                            </div>
                            <div className="form-group col-lg-12">
                                <input type="password" id="Confirm" name="confPassword" className="field" value={user.confPassword} onChange={this.handleChange} placeholder="Confirm Password"  />
                            </div>
                            <div className="form-group col-lg-12 col-md-12 col-sm-12 text-center">
                                {registering && 
                                <div>
                                   <input type="submit" value='Registering...' className="btn" disabled></input>
                                </div>
                                } 
                                {!registering && 
                                <div>
                                   <input type="submit" value='Sign Up' className="btn"></input>
                                </div>
                                } 
                                {/* <input type="submit" value="Sign Up" className="btn"></input> */}
                            </div>
                            
                            <div className="form-group col-lg-12 col-md-12 col-sm-12">
                                <div className="users">Already have an account? <Link to="/login">Sign In</Link></div>
                            </div>
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
    );
  } 
}

// const mapStateToProps=(state)=>{
//     return {
//         user: state.user
//     }
// }

// const mapDispatchToProps=(dispatch)=>{
//     return {
//         addNewUser: (userObj) => dispatch({
//             type:'ADD_NEW_USER',
//             payload: userObj
//         })
//     }
// }

function mapState(state) {
    const {registration, error} = state.registration

    return { registration: state.registration , alert:state.alert};
}



const actionCreators = {
    register: userActions.register

}

export default connect(mapState, actionCreators)(UserRegisterForm);






