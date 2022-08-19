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
import MapSection from './map'
import DetailsAccommodations from "./DetailsAccommodations";
import { Link } from "react-router-dom";

const Accommodation = () => {
const {accommodations, loading, error} = useSelector((state) => state.accommodations);
console.log('accomo', accommodations)
console.log('load', loading)

const [single, setSingle] = useState(false)
const [accommodation, setAccommodation] = useState({})
const [geolocation, setGeoLocation] = useState({})

const dispatch = useDispatch();

useEffect(() => {
    dispatch(listAccommodations())
  }, []);

  function handleSingleAccommodation(accId){
    console.log(accId)
    // dispatch(detailsAccommodation(accId))
    setSingle(true)
  //  setSingle(SingleAccommodation)
  const singleArr = accommodations.filter((acc)=>acc.id === accId)
  setAccommodation(...singleArr)
  
  }
  const location={
    address: accommodation.name,
    lat: accommodation.latitude, 
    lng: accommodation.longitude,
  }

 const handleDelete =(id)=>{
    const deleteArr = accommodations.filter((acc)=>acc.id === id)
    console.log("Are you sure you want this accomodation", {...deleteArr})
      
  }
    return ( 
        <div className="home" data-testid='update-1'>
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          {single ? (
            
          <div className="mainContent">
            <div className="single-accommodation">
                    <div className="accomodation-pics">
                        <img src={accommodation.images_links[0]} onClick={()=>handleDelete(accommodation.id)} style={{width:500, marginRight:20}} alt="" />
                    </div>
                    
                    <div>
                        <div className="accommodation-desc">
                            <p>{accommodation.name}</p>
                            <p>{accommodation.description}</p>
                            {/* <p>Whether you’re a hotel, urban B&B, beachside bungalow or apartment 
                                rental, we have a template to showcase your unique getaway.
                            </p> */}
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
            {/* <ListAccommodations accommodations={accommodations} loading={loading} error={error} handleSingleAccommodation={handleSingleAccommodation}/>    */}
          </div>
          ):
          <div className="mainContent">
            <ListAccommodations accommodations={accommodations} loading={loading} error={error} handleSingleAccommodation={handleSingleAccommodation}/>   
          </div>
          }
          
        </div>
      </div>
       );
}
 
export default Accommodation;
