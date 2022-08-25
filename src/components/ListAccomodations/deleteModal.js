import React, { useEffect, useState, Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css"
import { Alert, Button, Typography, Modal, LinearProgress } from '@mui/material';
import { Box } from '@mui/system';
import { deleteAccommodation } from "../../redux/actions/accommodationActions";

const AccommodationDeleteModal = ({
    isOpen,
    setOpen,
    handleClose,
    accommodation
}) => {
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

      const { deletingAccommodation, modal } = useSelector((state) => {
        return {
            deletingAccommodation: state.deletingAccommodation,
            modal: state.modal,
        };
      });
      console.log('deleteaccomm', deletingAccommodation)
      
      const dispatch = useDispatch();

      // delete an accommodation
    const handleDelete = async(id)=>{
        dispatch(deleteAccommodation(id))
    }

    useEffect(()=>{
        if(deletingAccommodation.isDeleted){
          setOpen('none')
        }
      },[deletingAccommodation.isDeleted])

    return ( 
        <div>
            {/* delete modal */}
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography variant="h5" color="primary">
                    Delete
                    </Typography>
                    <hr />
                    {deletingAccommodation.loading &&  !deletingAccommodation.isDeleted && <LinearProgress /> }
                    <> 
                    {accommodation && (
                    <>
                        <Typography>Are you sure you want to Delete? {accommodation.name} Accommodation</Typography>
                        <br />
                        <Button variant="outlined" onClick={handleClose} color="success">
                        Cancel
                        </Button>&nbsp;&nbsp;
                        <Button variant="contained" onClick={()=>{
                            handleDelete(accommodation.id)
                        }} color="error">
                        Yes
                        </Button>
                    </>
                    )}           
                    
                    <hr/>
                    </>
                </Box>
            </Modal>
        </div>
     );
}
 
export default AccommodationDeleteModal;