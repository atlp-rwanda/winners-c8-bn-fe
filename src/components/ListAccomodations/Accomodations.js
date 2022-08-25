import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { successToast, errorToast } from '../../helpers/generateToast';
import "react-toastify/dist/ReactToastify.css";
import ListAccommodations from "./ListAccommodations";
import {detailsAccommodation, listAccommodations} from "../../redux/actions/accommodationActions";
import {connect} from "react-redux"
import MapSection from '../Map/map'
import { Link } from "react-router-dom";

const Accommodation = () => {
const {accommodations, loading, error} = useSelector((state) => state.accommodations);

const dispatch = useDispatch();

useEffect(() => {
    dispatch(listAccommodations())
}, []);


    return ( 
        <div className="home" data-testid='update-1'>
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="mainContent">
          
            <ListAccommodations accommodations={accommodations} loading={loading} error={error}/>   
          </div>
        </div>
       </div>
       );
}
 
export default Accommodation;