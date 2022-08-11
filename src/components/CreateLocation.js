import React, { useState } from "react";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";


const CreateLocation =  (props) =>{
    let [activeStep, setActiveStep] = useState(1);
    const [location, setLocation] = useState({
      country: "",
      province: "",
      city: "",
    });

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
    }
    return(
        <div>
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
      
       <div className="d-flex jusify-content-between">
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
    )
        }

const mapStateToProps = state => ({
    token: state.auth.token
  });
  export default connect(
    mapStateToProps
  )(CreateLocation);