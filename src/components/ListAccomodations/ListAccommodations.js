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
import Pagination from "../Pagination";
import ReactPaginate from "react-paginate"
import AccommodationViewModal from "./viewModal"
import { Alert, Button, Typography, Modal,Snackbar } from '@mui/material';
import AccommodationUpdateModal from "./updateModal";
import AccommodationDeleteModal from "./deleteModal";
import { fetchUserProfile } from '../../redux/actions/userProfileAction';

const ListAccommodations = ({accommodations, loading, error}) => {
    // state
    const { user } = useSelector((state) => {
        return {
          user: state.userProfile?.user.user,
        };
    });

    const dispatch = useDispatch()
      useEffect(() => {
        fetchUserProfile()(dispatch);
    }, []);

    // modal
    const [open, setOpen] = React.useState('none');
    const handleClose= ()=> setOpen(false)

    let [accommodation, setAccommodation] = useState(0)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        border: '1px solid #000',
        boxShadow: 24,
        borderRadius: '10px',
        maxHeight: '100vh',
        overflowY: 'auto',
        p: 4,
      };
     
    //react -paginate
    const [pgnumber, setPgnumber] = useState(0);
    const accommodationsPerPage = 2;
    const visitedPage = pgnumber * accommodationsPerPage;
    let pageCount;
    {accommodations ? pageCount =  Math.ceil(accommodations.length / accommodationsPerPage): 0}
    const changePage = ({ selected }) => {
        setPgnumber(selected);
    };

    let displayedAccomomodations;
    {accommodations ? 
        displayedAccomomodations = accommodations
        .slice(visitedPage, visitedPage + accommodationsPerPage)
        .map((acc) => {
        return (
            <div className="accommodation" key={acc.id}>
                <div className="accomodation__thumbnail">
                    <img src={acc.images_links[acc.images_links.length > 0 ? acc.images_links.length - 1 : 0]} alt="" />
                </div>
                <div className="accomodation__desc">
                    <h2 id="accommodation__name">{acc.name}</h2>
                    <p id="accommodation__description">{acc.description}</p>
                </div>   
                <div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                    setOpen('view')
                    setAccommodation(acc);
                    }}
                    data-testid="accommodation_view_button"
                >
                    View
                </Button>
                </div>          
            </div>
        );
        }): 0
    }

    return (
        <div className="accommodation-wrapper">
                {accommodations && user && user.user_role === 'd01c0e35-b0ec-4724-85d5-48c2ecc995e7' &&  <button className="accomodation__new">+ Create Accomodation</button>}
                <div className="accommodations">
                {error && <p>{error}</p>}
                {loading && <div className="loader"></div>}
                {displayedAccomomodations}
                {accommodations &&
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                    />
                }
                </div>
                
                <AccommodationViewModal isOpen={open === 'view'? true : false} setOpen={setOpen} handleClose={handleClose} accommodation={accommodation}></AccommodationViewModal>
                <AccommodationUpdateModal isOpen={open === 'update' ? true : false} setOpen={setOpen} handleClose={handleClose} accommodation={accommodation}></AccommodationUpdateModal>
                <AccommodationDeleteModal isOpen={open === 'delete' ? true : false} setOpen={setOpen} handleClose={handleClose} accommodation={accommodation}></AccommodationDeleteModal>
        </div>
     );
}

export default ListAccommodations;
