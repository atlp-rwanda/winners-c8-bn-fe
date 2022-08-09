/*eslint-disable*/
import React from "react";
import "./request.scss"
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
const CreateRequest = () => {
    return ( 
  <div className="home">
       <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="titleDashboard">
          <div className="text">
           <h4>Create Trip Request</h4>
           
          </div>
          <h4>Dashboard&gt;&gt;</h4>
        </div>
           <form action="">
              <div className="form_container">
                <div className="form">
                  <label htmlFor="">Departure</label><br />
                    <select>
                      <option>Select Departure</option>
                      <option>Bus leaving</option>
                      <option>Train leaving</option>
                      <option>Aircraft leaving</option>

                    </select>
                </div>
                <div className="form">
                  <label htmlFor="">Destinations</label><br />
                  <select>
                      <option>Select Destination</option>
                      <option>Kicukiro</option>
                      <option>Gasabo</option>
                      <option>Nyamagabe</option>
                      <option>Burera</option>
                      <option>Kimironko</option>
                      <option>Rubavu</option>
                      <option>Rusizi</option>

                    </select>
                </div>
              </div>

              <div className="form_container">
                <div className="form">
                  <label htmlFor="">Travel Reason</label><br />
                  <input 
                  type="text" placeholder="Enter Travel Reason"
                  />
                </div>
                <div className="form">
                  <label htmlFor="">Accommodation</label><br />
                  <select>
                      <option>Select Accomodation</option>
                      <option>Mariot Hotel</option>
                      <option>M Hotel</option>
                      <option>Nolan Resto-Bar</option>
                      <option>Desert House</option>
                      <option>Serena Hotel</option>
                      <option>South Brige Motel</option>
                      <option>Rafiki Motel</option>

                    </select>
                </div>
              </div>

              <div className="form_container">
                <div className="form">
                  <label htmlFor="">Date Of Departure</label><br />
                  <input type="date" name="return"
       value="2022-08-08"
       min="2022-07-01" max="2050-12-31"/>
                  
                </div>
                <div className="form">
                  <label htmlFor="">Date Of Return</label><br />
                  <input type="date" name="return"
       value="2022-08-08"
       min="2022-07-01" max="2050-12-31"/>
                  
                </div>
              </div>
              <button type="submit">Create Request</button>

      
            </form>
     </div>
     
  </div>
  
);
}
 
export default CreateRequest;