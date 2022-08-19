import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import hotel from "../../../public/images/hotels/intentions.png";
import "../../../public/styles/Accommodation/list-accommodation.css";
import logo512 from "../../../public/images/logo512.png";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { successToast, errorToast } from '../../helpers/generateToast';
import "react-toastify/dist/ReactToastify.css";
import ListAccommodations from "./ListAccommodations";
import { Link, useParams } from "react-router-dom";
import {detailsAccommodation} from "../../redux/actions/accommodationActions";
import MapSection from './map'
import { connect } from 'react-redux';
const DetailAccommodation = (props) => {
const {accommodationId} = useParams();

const dispatch = useDispatch();

const location = {
    address: 'Four Point Square',
    lat: -1.9557580436202646, 
    lng: 30.06278144607643,
  }
const {singleAccommodation, loading} = useSelector((state) => state.singleAccommodation);

useEffect(() => {
    dispatch(detailsAccommodation(accommodationId))
  }, []);

  // console.log('props', props.accommodation.singleAccommodation.latitude)

    return ( 
      
        <div className="home" data-testid='update-1'>
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          
          <div className="mainContent">
            
            {loading && <div className="loader"></div>}
            {/* {singleAccommodation &&  */}
                <div className="single-accommodation">
                    {/* <div className="accomodation-pics">
                        <img src={logo512} alt="" />
                    </div> */}
                    
                    <div>
                        <div className="accommodation-desc">
                            <p>Dayenu Hotel</p>
                            <p>Whether you’re a hotel, urban B&B, beachside bungalow or apartment 
                                rental, we have a template to showcase your unique getaway.
                            </p>
                        </div>
                        <div className="accomodation-button">
                            <input type="button" className="add__btn" value="Add Room" />
                            <input type="button" className="rate__btn" value="Rate" />
                        </div>

                        <div className="google-map">
                        <MapSection location={location} zoomLevel={16} />
                        </div>

                    </div>
                    
                </div>
            {/* } */}
            
          </div>
        </div>
      </div>
       );
}

const mapStateToProps = (state) => {
  return {
    accommodation: state.singleAccommodation
    // accommodationDeleteData: state.accommodationDelete,
    // accommodationUpdateData: state.accommodationUpdate,
    // snackbarData: state.SnackBar,
  };
};
 
export default connect(mapStateToProps)(DetailAccommodation);
