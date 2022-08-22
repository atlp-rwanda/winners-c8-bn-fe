import React, { useEffect, useState } from 'react';
import { fetchRequest, fetchRequestComments, postRequestComment, deleteRequestComment } from '../redux/actions/requestActions';
import { fetchUserProfile } from '../redux/actions/userProfileAction';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../components/Table';
import { Alert, Button, Typography, Modal } from '@mui/material';
import { Box } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import CheckIcon from '@mui/icons-material/Check';
import "./comments.scss"
import { ToastContainer, toast } from 'react-toastify';
import { successToast, errorToast } from '../helpers/generateToast';

function Request() {
  const [open, setOpen] = React.useState(false);
  const { requests, user } = useSelector((state) => {
    return {
      requests: state.requests.requests,
      user: state.userProfile?.user.user,
    };
  });

// My codes
const [data, setData ] = useState("")
const [tripid, setTripId] = useState(null)
const comments= useSelector((state) => state.requestComments.requestComments?.comments);
const handleCommentChange = event => {
  // 👇️ update textarea value
  setData(event.target.value);

};

let formData = new FormData();

const postComment = (e) => {
  e.preventDefault();
  successToast('Posting Comment');
  formData.append('comment', data);
  postRequestComment({formData, tripid: currentTrip?.id})(dispatch);
};


const coments = (
  <div>
    {comments?.map((value) => 
    <div className="comment_" key={value.id}>
      <p >
        <CheckIcon className='_icon'/>
        {value.message} <br />
        <span className='_date'>{value.createdAt.substr(0, 10)}</span>
        <span className='_time'>{value.createdAt.substr(11, 5)}</span>
      </p>

    <IconButton aria-label="delete">
      <DeleteIcon 
      className="delete_icon"
      onClick={()=>{

        deleteRequestComment({commentId: value.id, tripid: currentTrip?.id})(dispatch);
      }}
      />
    </IconButton>
    </div>  
      )}
  </div>
)

  










  const handleClose = () => setOpen(false);
  const [currentTrip, setCurrentTrip] = useState(null);
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
  const headers = [
    { field: 'id', headerName: 'Trip Id' },
    {
      field: 'manager',
      headerName: 'Manager',
      flex: 1,
      valueGetter: ({ value: { firstName, lastName } }) =>
        `${firstName} ${lastName}`,
    },
    {
      field: 'owner',
      headerName: 'Requester',
      flex: 1,
      valueGetter: ({ value: { firstName, lastName } }) =>
        `${firstName} ${lastName}`,
    },
    { field: 'dateOfDeparture', headerName: 'Date of Departure', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: ({ value }) => (
        <>
          <Alert
            severity={
              value == 'Approved'
                ? 'success'
                : value == 'pending'
                ? 'warning'
                : 'error'
            }
          >
            {value}
          </Alert>
        </>
      ),
    },
    {
      field: 'action',
      headerName: 'actions',
      flex: 1,
      renderCell: ({ row }) => (
        <>
          <Button
            variant="outlined"
            color="info"
            onClick={() => {
              setCurrentTrip(row);
              fetchRequestComments(row?.id)(dispatch);
              setOpen(true);
            }}
            data-testid="request_view_button"
          >
            view
          </Button>
          {user?.user_role == '6927442b-84fb-4fc3-b799-11449fa62f52' && (
            <>
              {' '}
              <Button
                variant="outlined"
                color="warning"
                data-testid="request_approve_button"
                onClick={() => {
                  //functionality to approve trip
                }}
              >
                Approve
              </Button>
              <Button
                variant="outlined"
                color="error"
                data-testid="request_approve_button"
                onClick={() => {
                  //functionality to reject trip
                }}
              >
                Reject
              </Button>
            </>
          )}
        </>
      ),
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    fetchRequest(dispatch);
    fetchUserProfile()(dispatch);

  }, []);

  return (
    <>
      <Box sx={{}}>
        <Typography variant="h4" component="h1" gutterBottom>
          Trip requests
        </Typography>
        <Table headers={headers} requests={requests} />;
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography variant="h4" color="primary">
              Trip request
            </Typography>
            <hr />
            {currentTrip && ( 
              <>
                <Typography variant="h5">Trip Id</Typography>
                <Typography>{currentTrip.id}</Typography>
                <Typography variant="h5">Manager name</Typography>
                <Typography>
                  {currentTrip.manager.firstName +
                    ' ' +
                    currentTrip.manager.lastName}
                </Typography>
                <Typography variant="h5">Owner Name</Typography>
                <Typography>
                  {currentTrip.owner.firstName +
                    ' ' +
                    currentTrip.owner.lastName}
                </Typography>
                <Typography variant="h5">Travel Reason</Typography>
                <Typography>{currentTrip.travel_reason}</Typography>
                <Typography variant="h5">Date of Departure</Typography>
                <Typography>{currentTrip.dateOfDeparture}</Typography>
                <Typography variant="h5">Status</Typography>
                <Typography>{currentTrip.status}</Typography>
                <hr />
                <Typography variant="h5">Departure location</Typography>
                <Typography>
                  <strong>City:</strong> {currentTrip.departure.city}&nbsp;
                  <strong>State: </strong>
                  {currentTrip.departure.state || 'N/A'}&nbsp;
                  <strong>Province: </strong>
                  {currentTrip.departure.province || 'N/A'}&nbsp;
                  <strong>Country: </strong>
                  {currentTrip.departure.country || 'N/A'}
                </Typography>
                <Typography variant="h5">Destination location</Typography>
                {currentTrip.destinations?.map((destination, index) => (
                  <>
                    <Typography>Destionation {index + 1}</Typography>
                    <Typography>
                      <strong>City:</strong> {destination.city}&nbsp;
                      <strong>State: </strong>
                      {destination.state || 'N/A'}&nbsp;
                      <strong>Province: </strong>
                      {destination.province || 'N/A'}&nbsp;
                      <strong>Country: </strong>
                      {destination.country || 'N/A'}
                    </Typography>
                  </>
                ))}
                <hr />
            <h4>Comments</h4>
            
            {coments}  
            
            <form action="" className='_form_comments'>
            <textarea 
            className='comment_area'
            required
            onChange={handleCommentChange}
            >


            </textarea>
            <button className='publish_button'
            onClick={postComment}
            >
              <SendIcon className='_send_icon'/>
            </button>
          </form>

                  <hr/>
                {user.user_role != '6927442b-84fb-4fc3-b799-11449fa62f52' && (
                  <>
                    <Button variant="outlined">Edit</Button>
                    <Button variant="outlined" color="error">
                      Delete
                    </Button>
                  </>
                )}
              </>
            )}
          </Box>
        </Modal>
      </Box>
      <ToastContainer/>
    </>
  );
}

export default Request;
