
  import React, { useEffect, useState } from 'react';
  import {
    Button,
    Box,
    Chip,
    ImageList,
    ImageListItem,
    Modal,
    Typography,
    ButtonGroup,
  } from '@mui/material';
  import TextareaAutosize from '@mui/base/TextareaAutosize';
  import { connect, useDispatch, useSelector } from 'react-redux';
  import MapSection from '../Map/map'
  import { fetchUserProfile } from '../../redux/actions/userProfileAction';

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

  
  
  function srcset(image, size, rows = 1, cols = 1) {
    if (image) {
      image = image.replace(/^http:/, 'https:');
    }
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }
  
  
  function AccommodationViewModal({
    setOpen,
    isOpen,
    handleClose,
    accommodation
  }) {
    //
    const dispatch = useDispatch();

    useEffect(() => {
      fetchUserProfile()(dispatch);
    }, []);
  
  const {user} = useSelector((state) => {
    return {
      user: state.userProfile?.user.user
    };
  });

    return (
      <div>
        <Modal
          open={isOpen}
          onClose={handleClose}
        //   aria-labelledby={modalId}
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography  variant="h4" component="h2">
              {}
            </Typography>
            <Typography variant="body1" component="h2">
              {accommodation.name}
            </Typography>
            <hr />
            <br />
            <Typography variant="body1" component="h2">
              {accommodation.description}
            </Typography>
            <Typography variant="h6" component="h2">
              Images
            </Typography>
            <ImageList
              sx={{ width: 500, height: 200 }}
              variant="quilted"
              cols={4}
              rowHeight={121}
            >
              {accommodation && accommodation.images_links.length >= 1 ? (
                accommodation.images_links.map((item) => (
                  <ImageListItem
                    key={item}
                    cols={item.cols || 1}
                    rows={item.rows || 1}
                  >
                    <img
                      {...srcset(item, 121, item.rows, item.cols)}
                      alt={item.title}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))
              ) : ''}
            </ImageList>
            <hr />
            <MapSection accommodation= {accommodation}  zoomLevel={16} />
            <hr />
            { user && user.user_role === 'd01c0e35-b0ec-4724-85d5-48c2ecc995e7' && (
                  <>
                  <Button variant="contained" onClick={()=>{
                    setOpen('update')
                  }}>
                    Update
                  </Button>&nbsp;&nbsp;
                  <Button  variant="outlined" color="error" onClick={()=>{
                    setOpen('delete')
                  }}>
                    Delete
                  </Button>
                </>
                )}
            
            <div
              className="likesdislikes"
              style={{ display: 'flex', marginLeft: '10%' }}
            >
              
             
            </div>
          </Box>
        </Modal>
      </div>
      
    );
  }
  
  export default AccommodationViewModal;
  