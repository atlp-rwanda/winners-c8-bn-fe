import React, { useState } from "react";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";


const CreateAccomodation =  (props) =>{
  let [activeStep, setActiveStep] = useState(1);
  const [location, setLocation] = useState({
    country: "",
    province: "",
    city: "",
  });


  const [accomodation, setAccomodation] = useState({
    hotelName: "",
    accommodation_image: "",
    longitude: "",
    latitude: "",
    description: "",
  });

  const [accomodationRoom, setAccomodationRoom]=useState({
    bedType:"",
    Pricing:"",
    roomImage: "",
  })

  const next = () => {
    setActiveStep(activeStep + 1);
  };
  const prev = () => {
    setActiveStep(activeStep - 1);
  };

  const gotoStep = (step) => {
    if (step <= activeStep) {
      setActiveStep(step);
    } else if (step - activeStep <= 1) {
      setActiveStep(step);
    }
  };

  const onSubmit = async () => {
    console.log(props.token)
    if (activeStep == 1) {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${props.token}`)

      let raw = JSON.stringify(location);

      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
     
      let result = await fetch(
        "https://winners-c8-bn-be-staging.herokuapp.com/api/locations",
        requestOptions
      ).then((response) => response.json());

      if (result.status == 201) {
        toast.success(result.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }else{
        console.log(result)
        toast.error(result.message||result.error, {
          position: toast.POSITION.TOP_CENTER,
        });     
       }
    }
    if (activeStep == 2) {
        let myHeaders = new Headers();
      myHeaders.append("Content-Type", "multipart/form-data");
      myHeaders.append("Authorization", `Bearer ${props.token}`)
      const form=new FormData()
      for( let key in accomodation){
        form.append(key, accomodation[key])
      }

      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: form,
        redirect: "follow",
      };
     
      let result = await fetch(
        "https://winners-c8-bn-be-staging.herokuapp.com/api/accommodations",
        requestOptions
      ).then((response) => response.json());

      if (result.status == 201) {
        console.log(result);
        toast.success("Accomodation Created!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }else{

        toast.error(result.message||result.error, {
          position: toast.POSITION.TOP_CENTER,
        });      }
    }
    if (activeStep == 3) {
        let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${props.token}`)

      let raw = JSON.stringify(accomodationRoom);

      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
     
      let result = await fetch(
        "https://winners-c8-bn-be-staging.herokuapp.com/api/accommodations/{accommodationID}/rooms/",
        requestOptions
      ).then((response) => response.json());

      if (result.status == 201) {
        console.log(result);
        toast.success("Room is Created!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }else{
        console.log(result);
      }
    }
  };

  return (
    <div>

      <div className="progressbar">
        <ul id="progressbar">
          <ToastContainer/>
          <li
            className={activeStep == 1 ? "active" : ""}
            onClick={(e) => gotoStep(1)}
            id="location"
          >
            Create New Location
          </li>
          <li
            className={activeStep == 2 ? "active" : ""}
            id="accomodation"
            onClick={(e) => gotoStep(2)}
          >
            Creacte Accomodations
          </li>
          <li
            className={activeStep == 3 ? "active" : ""}
            id="rooms"
            onClick={(e) => gotoStep(3)}
          >
            Create accomodation romms
          </li>
        </ul>
      </div>

{/* Create new location */}
      {activeStep == 1 && (
        <div className="p-4 m-4">
          <form>
            <div>
              <label htmlFor="country">Country</label>
              <input
                value={location.country}
                onChange={(e) =>
                  setLocation({ ...location, country: e.target.value })
                }
                type="text"
                id="country"
                name="country"
                className="form-control"
              />
            </div>
            <div>
              <label htmlFor="province">Province</label>
              <input
                value={location.province}
                onChange={(e) =>
                  setLocation({ ...location, province: e.target.value })
                }
                type="text"
                id="province"
                name="province"
                className="form-control"
              />
            </div>
            <div>
              <label htmlFor="city">City</label>
              <input
                value={location.city}
                onChange={(e) =>
                  setLocation({ ...location, city: e.target.value })
                }
                type="text"
                id="city"
                name="city"
                className="form-control"
              />
            </div>
          </form>
        </div>
      )}

      {activeStep == 2 && ( <div className="p-4 m-4">
          <form>
            <div>
              <label htmlFor="hotelName">Hotel Name</label>
              <input
                value={accomodation.hotelName}
                onChange={(e) =>
                  setAccomodation({ ...accomodation, hotelName: e.target.value })
                }
                type="text"
                id="hotelName"
                name="hotelName"
                className="form-control"
              />
            </div>
            <div>
              <label htmlFor="image">Image</label>
              <input
                onChange={(e) =>
                  setAccomodation({ ...accomodation, accommodation_image: e.target.files[0] })
                }
                type="file"
                id="accomo"
                name="accomodationImages"
                className="form-control"
              />
            </div>
            <div>
              <label htmlFor="longitude">Longitude</label>
              <input
                value={accomodation.longitude}
                onChange={(e) =>
                  setAccomodation({ ...accomodation, longitude: e.target.value })
                }
                type="text"
                id="longitude"
                name="longitude"
                className="form-control"
              />
            </div>
            <div>
              <label htmlFor="latitude">Latitude</label>
              <input
                value={accomodation.latitude}
                onChange={(e) =>
                  setAccomodation({ ...accomodation, latitude: e.target.value })
                }
                type="text"
                id="latitude"
                name="latitude"
                className="form-control"
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <input
                value={accomodation.description}
                onChange={(e) =>
                  setAccomodation({ ...accomodation, description: e.target.value })
                }
                type="text"
                id="description"
                name="description"
                className="form-control"
              />
            </div>
          </form>
        </div>
      
      )
      }

      {activeStep == 3 && (
       <div className="p-4 m-4">
       <form>
         <div>
           <label htmlFor="bedType">Bed Type</label>
           <input
             value={accomodationRoom.bedType}
             onChange={(e) =>
               setAccomodationRoom({ ...accomodationRoom, bedType: e.target.value })
             }
             type="text"
             id="bedType"
             name="bedType"
             className="form-control"
           />
         </div>
         <div>
           <label htmlFor="pricing">Pricing</label>
           <input
             value={accomodationRoom.pricing}
             onChange={(e) =>
               setAccomodationRoom({ ...accomodationRoom, pricing: e.target.value })
             }
             type="text"
             id="pricing"
             name="pricing"
             className="form-control"
           />
         </div>
         <div>
           <label htmlFor="roomImage">Room Image</label>
           <input
             value={accomodationRoom.roomImage}
             onChange={(e) =>
               setAccomodationRoom({ ...accomodationRoom, roomImage: e.files[0] })
             }
             type="file"
             id="roomImage"
             name="roomImage"
             className="form-control"
           />
         </div>
       </form>
     </div>
      )}

      <div className="d-flex jusify-content-between">
        {activeStep > 1 && (
          <button className="p-2 btn" onClick={prev}>
            Prev
          </button>
        )}
        <button className="p-2 btn " onClick={onSubmit}>
          Save
        </button>
        {activeStep < 3 && (
          <button className="p-2 btn" onClick={next}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}
const mapStateToProps = state => ({
    token: state.auth.token
  });
  export default connect(
    mapStateToProps
  )(CreateAccomodation);
