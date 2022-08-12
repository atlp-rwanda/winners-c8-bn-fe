import MenuItem from '@mui/material/MenuItem';
import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Skeleton } from "@mui/material";
import Select from '@mui/material/Select';
import { fetchRoles, fetchUsers, assignRoles } from '../../redux/actions/roleActions';
import { useDispatch, useSelector } from 'react-redux';
import "./UserRoleDash.scss"
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
const UserRoleDash = () => {
        const userInfos = useSelector((state) => state.users?.users?.data)
      
      
        const roleData = useSelector((state) => state.roles?.roles)
      
        useEffect(() => {
          }, [SelectedEmail])
      
      
        const [users, setUsers] = useState()
      
      
        const [isLoading, setIsLoading] = useState(false);
      
        const [SelectedRole, setSelectedRole]  = useState(null)
      
        const [SelectedEmail, setSelectedEmail]  = useState(null)
      
        const [roles, setRoles] = useState(null)
        
        const dispatch = useDispatch()
      
      
      useEffect(() => {
      fetchUsers()(dispatch)
      }, [])
      
      useEffect(() => {
        fetchRoles()(dispatch)
        }, [])
      
      
      
        const SubmitAssignRole = (event) =>{
        event.preventDefault();
        dispatch(assignRoles(SelectedEmail, SelectedRole))
        }
        
        useEffect(() => {
          setUsers({
            firstName:userInfos?.firstName,
            lastName:userInfos?.lastName,
            email:userInfos?.email,
          })
          setIsLoading(true)
        }, [userInfos])
      
          useEffect(() => {
            setRoles({
              id:roleData?.roleId,
              role:roleData?.roleName,
            })
            setIsLoading(true)
        }, [roleData])
    return ( 
        <>
      <div className="Content" data-testid='assign-role'>
      <Sidebar />
      <div className="ContentContainer">
        <Navbar />
        <div className="titleDashboard">
          <div className="text">
           <h4>Dashboard&gt;&gt;</h4>
           <h6>Assign Role</h6>
           </div>
           <h4>Dashboard&gt;&gt;</h4>
          </div>
        
  <div className='contentBlock'>
  <p>Assign Role</p>  
  {isLoading ? (<div className="Content">
<form className='formClass'>
<label className='labelClass'>Choose an Email</label>

<Select
 className='inputData'
 data-testid="user-byEmail"
defaultValue={users?.email}
  onChange={(event) =>
    setSelectedEmail(
       event.target.value,
    )
  }
 >
     {userInfos?.map(value => {
    return (
      <MenuItem value={value.email} key={value.email}>
        {value.email}
      </MenuItem>
    )
  })}
 </Select>
<div className='role'>Select Role name</div>
<Select
 className='OptionSelect'
 data-testid="role-name-byId"
  defaultValue={roles?.role}
  onChange={(event) =>
{setSelectedRole(event.target.value)}
  }
 >
   {roleData?.map(value =>{
     return ( <MenuItem  value={value.id} key={value.id}>
       {value.roleName}
     
     </MenuItem>)
   })}
 </Select>
<button
className='buttonClass'
type="submit"
data-testid="assign-role-btn"
onClick={SubmitAssignRole}

><div className='buttonText'>assignRole</div></button> 
<ToastContainer/>
</form>
</div>):
          <Skeleton
          variant="rectangle"
          animation="wave"
          width={1100}
          height={800}
          />}
</div>
      </div>
    </div>
    </>
     );
}
 
export default UserRoleDash;