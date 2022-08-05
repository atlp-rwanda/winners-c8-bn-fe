import "./userprofile.scss";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {fetchUserProfile} from "../../redux/actions/userProfileAction"
import { Skeleton } from "@mui/material";
const UserProfile = () => {

  const userData= useSelector((state) => state.userProfile?.user?.user)
  console.log("here is the data",userData)

  const [formData, setFormData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUserProfile()(dispatch);
  }, []);

  useEffect(() => {
    setFormData({
      firstName: userData && userData?.firstName,
      lastName: userData && userData?.lastName,
      email: userData && userData?.email,
      department: userData && userData?.department,
      gender: userData && userData?.gender,
      image: userData && userData?.image,
      phone: userData && userData?.phoneNumber,
      currency: userData && userData?.preferredCurrency,
      language: userData && userData?.preferredLanguage,
      username: userData && userData?.username,
    })
    setIsLoading(true)

  }, [userData]);
console.log(formData?.firstName)
  
    return ( 
      <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="titleDashboard">
          <div className="text">
           <h3>Dashboard&gt;&gt;</h3>
           <h4>Settings&gt;&gt;</h4>
           <h6>Personal information</h6>
          </div>
          <h4>Dashboard&gt;&gt;</h4>
        </div>
        <div className="mainContent">
          <p>Personal information</p>
          {isLoading ? (<div className="Content">
            <p>Your photo</p>


            <form action="">


            <div className="profile_image">
              <div className="image_info">
                <img
                src="https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
                className="avatar"
                />
                <div className="text_info">
                  <input
                    type="text"
                    defaultValue={formData?.username}
                    className="Text_input"
                  />
                  <p>{formData?.email}</p>
                </div>
                
              </div>
              <button>Upload New</button>
            </div>

            <hr />

              <div className="form_container">
                <div className="form">
                  <label htmlFor="">First Name</label><br />
                  <input 
                  type="text" 
                  defaultValue={formData?.firstName}
                  />
                </div>
                <div className="form">
                  <label htmlFor="">Last Name</label><br />
                  <input
                   type="text" 
                   defaultValue={formData?.lastName}
                  />
                </div>
              </div>

              <div className="form_container">
                <div className="form">
                  <label htmlFor="">Title</label><br />
                  <input 
                  type="text" 
                  defaultValue={formData?.firstName}
                  />
                </div>
                <div className="form">
                  <label htmlFor="">Gender</label><br />
                  <input 
                  type="text" 
                  defaultValue={formData?.gender}
                  />
                </div>
              </div>

              <div className="form_container">
                <div className="form">
                  <label htmlFor="">Phone Number</label><br />
                  <input 
                  type="text" 
                  defaultValue={formData?.phone}
                  />
                </div>
                <div className="form">
                  <label htmlFor="">Currency</label><br />
                  <input 
                  type="text" 
                  defaultValue={formData?.currency}
                  />
                </div>
              </div>

              <div className="form_container">
                <div className="form">
                  <label htmlFor="">Language</label><br />
                  <input 
                  type="text" 
                  defaultValue={formData?.language}
                  />
                </div>
                <div className="form">
                  <label htmlFor="">Department</label><br />
                  <input 
                  type="text" 
                  defaultValue={formData?.department}
                  />
                </div>
              </div>
              <button type="submit">Update Profile</button>

            </form>

          </div>):
          <Skeleton
          variant="rectangle"
          animation="wave"
          width={1100}
          height={800}
          />
          }
        </div>
      </div>
    </div>
     );
}
 
export default UserProfile;