import "./userprofile.scss";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {fetchUserProfile, updateUserProfile} from "../../redux/actions/userProfileAction"
import { Skeleton } from "@mui/material";
const UserProfile = () => {

  const userData= useSelector((state) => state.userProfile?.user?.user)
  // console.log("here is the data",userData)

  const [formData, setFormData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUserProfile()(dispatch);
  }, []);

  useEffect(() => {
    setFormData({
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      email: userData?.email,
      department: userData?.department,
      gender: userData?.gender,
      image: userData?.image,
      phoneNumber: userData?.phoneNumber,
      currency: userData?.preferredCurrency,
      language: userData?.preferredLanguage,
      username: userData?.username,
    })
    setIsLoading(true)

  }, [userData]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    updateUserProfile(formData)(dispatch)
    console.log(formData)
  };
  
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
                src={formData?.image ? formData?.image :`https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"`}
                alt=""
                className="avatar"
                />
                <div className="text_info">
                  <input
                    type="text"
                    defaultValue={formData?.username}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        username: event.target.value,
                      })
                    }
                    className="Text_input"
                  />
                  <p>{formData?.email}</p>
                </div>
                
              </div>
              <input
              type="file"
              
              onChange={(event) =>
                setFormData({
                  ...formData,
                  image: event.target.files[0],
                })
              }
              />
            </div>

            <hr />

              <div className="form_container">
                <div className="form">
                  <label htmlFor="">First Name</label><br />
                  <input 
                  type="text" 
                  defaultValue={formData?.firstName}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      firstName: event.target.value,
                    })
                  }
                  />
                </div>
                <div className="form">
                  <label htmlFor="">Last Name</label><br />
                  <input
                   type="text" 
                   defaultValue={formData?.lastName}
                   onChange={(event) =>
                    setFormData({
                      ...formData,
                      lastName: event.target.value,
                    })
                  }
                  />
                </div>
              </div>

              <div className="form_container">
                <div className="form">
                  <label htmlFor="">Title</label><br />
                  <input 
                  type="text" 
                  defaultValue={formData?.firstName}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      firstName: event.target.value,
                    })
                  }
                  />
                </div>
                <div className="form">
                  <label htmlFor="">Gender</label><br />
                  <input 
                  type="text" 
                  defaultValue={formData?.gender}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      gender: event.target.value,
                    })
                  }
                  />
                </div>
              </div>

              <div className="form_container">
                <div className="form">
                  <label htmlFor="">Phone Number</label><br />
                  <input 
                  type="text" 
                  defaultValue={formData?.phoneNumber}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      phoneNumber: event.target.value,
                    })
                  }
                  />
                </div>
                <div className="form">
                  <label htmlFor="">Currency</label><br />
                  <input 
                  type="text" 
                  defaultValue={formData?.currency}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      currency: event.target.value,
                    })
                  }
                  />
                </div>
              </div>

              <div className="form_container">
                <div className="form">
                  <label htmlFor="">Language</label><br />
                  <input 
                  type="text" 
                  defaultValue={formData?.language}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      language: event.target.value,
                    })
                  }
                  />
                </div>
                <div className="form">
                  <label htmlFor="">Department</label><br />
                  <input 
                  type="text" 
                  defaultValue={formData?.department}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      department: event.target.value,
                    })
                  }
                  />
                </div>
              </div>
              <button 
              type="submit"
              onClick={handleUpdate}x
              >Update Profile</button>

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