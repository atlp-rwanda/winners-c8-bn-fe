import React from "react";
import "../../../public/styles/Accommodation/list-accommodation.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {listAccommodations} from "../../redux/actions/accommodationActions";
import { ToastContainer, toast } from "react-toastify";
import { successToast, errorToast } from '../../helpers/generateToast';
import {useState, useEffect} from "react";
import 'react-toastify/dist/ReactToastify.css';
import "./loader.scss"

const ListAccommodations = ({accommodations, loading, error, handleSingleAccommodation}) => {

    return (
        <div className="accommodation-wrapper">
                {accommodations && <button className="accomodation__new">+ Create Accomodation</button>}
                <div className="accommodations">
                {error && <p>{error}</p>}
                {loading && <div className="loader"></div>}
                {accommodations && accommodations.map((acc)=>(
                    
                    <div className="accommodation" key={acc.id}>
                        <div className="accomodation__thumbnail">
                            <img src={acc.images_links[0]} alt="" />
                        </div>
                        <div className="accomodation__desc">
                            <p>{acc.name}</p>
                            <p>{acc.description}</p>
                        </div>   
                        <div>
                            {/* <Link to={`/accommodations/${acc.id}`}> */}
                                <input type="button" onClick={()=> handleSingleAccommodation(acc.id)} className="accomodation__btn" value="View" />
                            {/* </Link> */}
                        </div>          
                    </div>
                ))}
                {!loading && accommodations &&
                    <div className="pagination">
                        <div>
                            <input type="button" className="" value="< Prev" />
                        </div>
                        <div>
                            <input type="button" className="" value="Next >" />
                        </div>
                    </div> 
                }
                </div>
        </div>
     );
}
 
export default ListAccommodations;