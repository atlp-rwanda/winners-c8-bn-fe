import React from 'react';
import '../../public/styles/verify/index.css';
import image from '../../public/images/approved.png';

const VerifyUser = () => {
 
    return(
        <div className='verify'>
            <img src={image} className='image'/>
            <h2 className='heading'>Verified!</h2>
            <p>You have successfully <br/>verified the account</p>
           <button className='battom'>Go to login</button>
        </div>
    )
}

export default VerifyUser;