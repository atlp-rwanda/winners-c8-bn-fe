import {
    Box,
    Modal,
    Typography,
    Button,
    TextField,
    ImageList,
    ImageListItem,
    Grid,
    MenuItem,
    LinearProgress,
    Alert
  } from '@mui/material';
  import axios from 'axios';
  import React, { useEffect, useState } from 'react';
  import { connect, useDispatch, useSelector } from 'react-redux';
  import { Navigate } from 'react-router';
  import { updateAccommodation } from '../../redux/actions/accommodationActions';
  import axiosInstance from '../../helpers/http';
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    maxHeight: '100vh',
    overflowY: 'auto',
    p: 4,
  };

  function AccommodationUpdateModal({
    isOpen,
    setOpen,
    handleClose,
    accommodation,
    }) {
   
    const [accommodationName, setAccommodationName] = useState('');
    const [description, setDescription] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [locationId, setLocationId] = useState('');
    const [images, setImages] = useState(null);

    const handleImages = (e) => {
      setImages(e.target.files[0]);
    };
    const [locations, setLocations] = useState([]);

    const { updatingAccomodation } = useSelector((state) => {
      return {
        updatingAccomodation: state.updatingAccomodation,
      };
    });
    
    const dispatch = useDispatch();

    useEffect(()=>{
      setAccommodationName(accommodation.name),
      setDescription(accommodation.description),
      setLatitude(accommodation.latitude),
      setLongitude(accommodation.longitude),
      setLocationId(accommodation.locationId),
      setImages(accommodation.images)
  
    }, [accommodation])

    useEffect(() => {
      const fetchLocations = async () => {
        const result = await axiosInstance.get('/locations');
        setLocations(result.data.data);
      };
      fetchLocations();
    }, []);


    
    const handleUpdate = async () => {

    dispatch(updateAccommodation(accommodation.id, {
      accommodationName,
      description,
      locationId,
      images,
      latitude,
      longitude
    }))
    // handleClose()

    };
    
    useEffect(()=>{
      if(updatingAccomodation.isUpdated){
        setOpen('none')
      }
    },[updatingAccomodation.isUpdated])

    return (
      <div>
        <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color="primary"
          >
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {accommodation.name} 
            {updatingAccomodation.loading &&  !updatingAccomodation.isUpdated && <LinearProgress /> }
          </Typography>
          <hr />
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <TextField
                  id=""
                  label="Name"
                  variant="filled"
                  onChange={(e) => setAccommodationName(e.target.value)}
                  value={accommodationName}
                />
                <br />
                <br />
                <TextField
                  id=""
                  label="Location"
                  variant="filled"
                  select
                  helperText="Please select accommodation location"
                  value={locationId}
                  onChange={(e) => setLocationId(e.target.value)}
                >
                  {locations.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.city}
                    </MenuItem>
                  ))}
                </TextField>
                <br />
                <br />
                <TextField
                  id=""
                  label="Latitude"
                  variant="filled"
                  onChange={(e) => setLatitude(e.target.value)}
                  value={latitude}
                />
                <br />
                <br />

                <TextField
                  id=""
                  label="Longitude"
                  variant="filled"
                  onChange={(e) => setLongitude(e.target.value)}
                  value={longitude}
                />
      
            </Grid>
            <Grid item xs={12} md={4}>
                <TextField
                  id=""
                  variant="filled"
                  type="file"
                  onChange={handleImages}
                /> <br /><br />

              {!updatingAccomodation.loading && !updatingAccomodation.isupdated &&
                <Button
                  onClick={handleUpdate}
                  variant="outlined"
                  color="primary"
                >
                  Update
                </Button>
               }
                &nbsp;&nbsp;
                <Button
                  onClick={()=>{setOpen('view')}}
                  variant="contained"
                  disabled={updatingAccomodation.loading}
                  color="primary"
                >
                  Cancel
                </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
        
      </div>
    );
  }
  
  export default AccommodationUpdateModal;
  