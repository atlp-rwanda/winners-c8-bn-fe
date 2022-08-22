import React, { useEffect, useState } from 'react';
import { fetchRequest, fetchRequestComments, postRequestComment, deleteRequestComment } from '../redux/actions/requestActions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import "./comments.scss"
import { ToastContainer, toast } from 'react-toastify';
import { successToast, errorToast } from '../helpers/generateToast';
import 'react-toastify/dist/ReactToastify.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function Comments(props) {

  const [data, setData ] = useState("")

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userProfile?.user?.user);

  const requests= useSelector((state) => state.requests.requests);

  const comments= useSelector((state) => state.requestComments.requestComments?.comments);

console.log(comments)

const handleCommentChange = event => {
  // 👇️ update textarea value
  setData(event.target.value);
  console.log(data);
};

let formData = new FormData();

const postComment = (e) => {
  e.preventDefault();
  successToast('Posting Comment');
  formData.append('comment', data);
  postRequestComment(formData)(dispatch);
};


const coments = (
  <div>
    {comments?.map((value) => 
    <div className="comment_">
      <p key={value.id}>
        {value.message}
      </p>

    <IconButton aria-label="delete">
      <DeleteIcon 
      className="delete_icon"
      onClick={()=>{
        localStorage.setItem('commentId', JSON.stringify(value.id));
        deleteRequestComment(value.id)(dispatch);
      }}
      />
    </IconButton>
    </div>  
      )}
  </div>
)



  useEffect(() => {

    fetchRequestComments()(dispatch);

  }, []);


  return (
    <div>
      <div className="comments_container">
        <h1>Trip Request Comments</h1>
        <div className="trip_info">
          <div className="owner_">
            <p>Owner</p>
            <h4>Elissa Design</h4>
          </div>
          <div className="owner_">
            <p>Travel Reason</p>
            <h4>Elissa Design</h4>
          </div>
          <div className="owner_">
            <p>Date of Departure</p>
            <h4>2022-08-07</h4>
          </div>
          <div className="owner_">
            <p>Status</p>
            <h4 className='status_'>Pending</h4>
          </div>
        </div>

        <div className="comments_section">
          <p>Comments</p>
          <hr />

            {coments}


          <form action="">
            <textarea 
            className='comment_area'
            required
            onChange={handleCommentChange}
            >


            </textarea>
            <button className='publish_button'
            onClick={postComment}
            >
              Publish
            </button>
          </form>

        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Comments