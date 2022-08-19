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

const SingleAccommodation = ({location}) => {
    return ( 
        
            <div className="single-accommodation">
            <div className="accomodation-pics">
                <img src={logo512} alt="" />
            </div>
            <div>
                <div className="accommodation-desc">
                    <p>Dayenu Hotel</p>
                    <p>Whether you’re a hotel, urban B&B, beachside bungalow or apartment 
                        rental, we have a template to showcase your unique getaway.
                    </p>
                </div>
                <div className="accomodation-button">
                    <input type="button" value="Add Room" />
                    <input type="button" value="Rate" />
                </div>

                <div className="google-map">
                <MapSection location={location} zoomLevel={16} />
                </div>

            </div>
            
        </div>
    
     );

    }
export default SingleAccommodation;