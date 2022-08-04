import "./userprofile.scss";
import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { userProfileAction } from "../../redux/actions/userProfileAction";
const UserProfile = () => {

  const user = useSelector(state => state.userInfo.trip)
  console.log(user)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfileAction());
  }, []);

    return ( 
      <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="titleDashboard">
          <div className="text">
           <h3>Dashboard&gt;&gt;</h3>
           <h4>Settings&gt;&gt;</h4>
           <p>Personal information</p>
          </div>
          <h4>Dashboard&gt;&gt;</h4>
        </div>
        <div className="mainContent">
          <p>Personal information</p>
          <div className="Content">
            <p>Your photo</p>
            <div className="profile_image">
              <div className="image_info">
                <img
                src="https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
                className="avatar"
                />
                <div className="text_info">
                  <h4>Elissa Design</h4>
                  <p>elissadesigner@gmail.com</p>
                </div>
                
              </div>
              <button>Upload New</button>
            </div>

            <hr />

            <form action="">

              <div className="form_container">
                <div className="form">
                  <label htmlFor="">First Name</label><br />
                  <input type="text" />
                </div>
                <div className="form">
                  <label htmlFor="">Last Name</label><br />
                  <input type="text" />
                </div>
              </div>

              <div className="form_container">
                <div className="form">
                  <label htmlFor="">Title</label><br />
                  <input type="text" />
                </div>
                <div className="form">
                  <label htmlFor="">Gender</label><br />
                  <input type="text" />
                </div>
              </div>

              <div className="form_container">
                <div className="form">
                  <label htmlFor="">Phone Number</label><br />
                  <input type="text" />
                </div>
                <div className="form">
                  <label htmlFor="">Currency</label><br />
                  <input type="text" />
                </div>
              </div>

              <div className="form_container">
                <div className="form">
                  <label htmlFor="">Language</label><br />
                  <input type="text" />
                </div>
                <div className="form">
                  <label htmlFor="">Department</label><br />
                  <input type="text" />
                </div>
              </div>
              <button type="submit">Update Profile</button>

            </form>

          </div>
        </div>
      </div>
    </div>
     );
}
 
export default UserProfile;