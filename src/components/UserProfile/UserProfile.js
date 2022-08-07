import "./userprofile.scss";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {fetchUserProfile, updateUserProfile} from "../../redux/actions/userProfileAction"
import { Skeleton } from "@mui/material";
import { Co2Sharp } from "@mui/icons-material";
const UserProfile = () => {

  const userData= useSelector((state) => state.userProfile?.user?.user)
  // console.log("here is the data",userData)

  const [dataForm, setFormData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [disable, setDisable] = useState(true)
  const [preview, setPreview] = useState("")
  const dispatch = useDispatch();

  
  useEffect(() => {
    fetchUserProfile()(dispatch);
  }, []);

  let formData = new FormData();

  const updateUser = (e) =>{
    e.preventDefault();

    formData.append("firstName",dataForm?.firstName)
    formData.append("lastName",dataForm?.lastName)
    formData.append("department",dataForm?.department)
    formData.append("gender",dataForm?.gender)
    formData.append("image",dataForm?.image)
    formData.append("phoneNumber",dataForm?.phoneNumber)
    formData.append("preferredCurrency",dataForm?.preferredCurrency)
    formData.append("preferredLanguage",dataForm?.preferredLanguage)
    formData.append("username",dataForm?.username)

    updateUserProfile(formData)(dispatch)
    location.reload();
  }
   

  useEffect(() => {
    setFormData({
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      email: userData?.email,
      department: userData?.department,
      gender: userData?.gender,
      image: userData?.image,
      phoneNumber: userData?.phoneNumber,
      preferredCurrency: userData?.preferredCurrency,
      preferredLanguage: userData?.preferredLanguage,
      username: userData?.username,
    })
    setIsLoading(true)

  }, [userData]);

  //Preview image before upload
  const previewImage = (e) =>{
    e.preventDefault();
    console.log("first")
    if(dataForm?.image){
      setPreview(URL.createObjectURL(dataForm?.image))
    }
    console.log("Second")

  } 


  const editUser = async (event) => {
    event.preventDefault();
    setDisable(false)
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
                src={preview ? (preview): dataForm?.image ?(dataForm?.image) : `https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg`}
                alt=""
                className="avatar"
                />

                <div className="text_info">
                  <input
                    type="text"
                    disabled={disable}
                    defaultValue={dataForm?.username}
                    onChange={(event) =>
                      setFormData({
                        ...dataForm,
                        username: event.target.value,
                      })
                    }
                    className="Text_input"
                  />
                  <p>{dataForm?.email}</p>
                </div>
                
              </div>
              <input
              type="file"
              name="file_upload"
              disabled={disable}
              onChange={(event) =>
                setFormData({
                  ...dataForm,
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
                  defaultValue={dataForm?.firstName}
                  disabled={disable}
                  onChange={(event) =>
                    setFormData({
                      ...dataForm,
                      firstName: event.target.value,
                    })
                  }
                  />
                </div>
                <div className="form">
                  <label htmlFor="">Last Name</label><br />
                  <input
                   type="text" 
                   disabled={disable}
                   defaultValue={dataForm?.lastName}
                   onChange={(event) =>
                    setFormData({
                      ...dataForm,
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
                  defaultValue={dataForm?.firstName}
                  disabled={disable}
                  onChange={(event) =>
                    setFormData({
                      ...dataForm,
                      firstName: event.target.value,
                    })
                  }
                  />
                </div>
                <div className="form">
                  <label htmlFor="">Gender</label><br />
                  <input 
                  type="text" 
                  disabled={disable}
                  defaultValue={dataForm?.gender}
                  onChange={(event) =>
                    setFormData({
                      ...dataForm,
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
                  disabled={disable}
                  defaultValue={dataForm?.phoneNumber}
                  onChange={(event) =>
                    setFormData({
                      ...dataForm,
                      phoneNumber: event.target.value,
                    })
                  }
                  />
                </div>
                <div className="form">
                  <label htmlFor="">Currency</label><br />
                  <input 
                  type="text" 
                  disabled={disable}
                  defaultValue={dataForm?.preferredCurrency}
                  onChange={(event) =>
                    setFormData({
                      ...dataForm,
                      preferredCurrency: event.target.value,
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
                  disabled={disable}
                  defaultValue={dataForm?.preferredLanguage}
                  onChange={(event) =>
                    setFormData({
                      ...dataForm,
                      preferredLanguage: event.target.value,
                    })
                  }
                  />
                </div>
                <div className="form">
                  <label htmlFor="">Department</label><br />
                  <input 
                  type="text" 
                  disabled={disable}
                  defaultValue={dataForm?.department}
                  onChange={(event) =>
                    setFormData({
                      ...dataForm,
                      department: event.target.value,
                    })
                  }
                  />
                </div>
              </div>
              <button 
              type="submit"
              onClick={editUser}
              >
                Edit
              </button>
              <button 
              type="submit"
              {...isLoading? `disabled`: onClick={updateUser}}
              className="update_btn"
              >
                Update
              </button>
              {/* <button 
              type="submit"
              onClick={previewImage}
              >
                Update
              </button> */}

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