import React, { Component } from "react";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import BedIcon from "../../public/images/icons/bed.svg";
import pricing from "../../public/images/icons/cash.svg";
import Cloud from "../../public/images/icons/cloud.svg";
import hotelIcon from "../../public/images/icons/hotel.svg";
import imageIcon from "../../public/images/icons/image.svg";
import longitudeIcon from "../../public/images/icons/longitude.svg";
import latitudeIcon from "../../public/images/icons/latitude.svg";
import descriptionIcon from "../../public/images/icons/description.svg";
import locationIcon from "../../public/images/icons/locationIcon.svg";

class CreateAccommodation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accomodation: {
        name: "",
        accommodation_image: "",
        location_id: "",
        longitude: "",
        latitude: "",
        description: "",
      },
      accomodationRoom: {
        accommodation_id: "",
        bedType: "",
        pricing: "",
        roomImage: "",
      },
      activeStep: 1,
      locations: [],
      accommodations: [],
    };
  }
  handleNext = () => {
    this.setState({ ...this.state, activeStep: this.state.activeStep + 1 });
  };
  handlePrevious = () => {
    this.setState({ ...this.state, activeStep: this.state.activeStep - 1 });
  };
  handleJumpToStep = (step) => {
    const { activeStep } = this.state;
    if (step <= activeStep) {
      this.setState({ ...this.state, activeStep: step });
    } else if (step - activeStep <= 1) {
      this.setState({ ...this.state, activeStep: step });
    }
  };
  handleSubmit = async () => {
    console.log(this.props.token);
    const { activeStep, accomodation, accomodationRoom } = this.state;
    if (activeStep == 1) {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "multipart/form-data");
      myHeaders.append("Authorization", `Bearer ${this.props.token}`);
      const form = new FormData();
      for (let key in accomodation) {
        form.append(key, accomodation[key]);
      }
      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: form,
        redirect: "follow",
      };
      this.setState({ wait: true });
      toast("Creating accommodation . . .", { position: toast.POSITION.TOP_CENTER });

      let result = await fetch(
        "https://winners-c8-bn-be-staging.herokuapp.com/api/accommodations/ ",
        requestOptions
      ).then((response) => response.json());
      if (result.status == 201) {
        console.log(result);
        toast.success("Accommodation facility created successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error(result.message || result.error, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
    if (activeStep == 2) {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${this.props.token}`);
      let raw = JSON.stringify(accomodationRoom);
      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      
      let result = await fetch(
        `https://winners-c8-bn-be-staging.herokuapp.com/api/accommodations/${this.state.accomodationRoom.accommodation_id}/rooms/`,
        requestOptions
      ).then((response) => response.json());
      if (result.status == 201) {
        console.log(result);
        toast.success("Room is Created!", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        console.log(result);
      }
    }
  };

  handle;

  componentDidMount() {
    const token = window.localStorage.getItem("auth-token");

    const url = "https://winners-c8-bn-be-staging.herokuapp.com/api/locations";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        const data = result.data;
        this.setState({ locations: data });
      })
      .catch((error) => {
        console.error(error);
      });
    const url_accommodation =
      "https://winners-c8-bn-be-staging.herokuapp.com/api/accommodations/";
    fetch(url_accommodation, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        const data = result.data;
        this.setState({ accommodations: data });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    const {
      accomodation,
      accomodationRoom,
      activeStep,
      locations,
      accommodations,
    } = this.state;
    const options = locations.map((location) => {
      const name = `${location.city}, ${location.country}`;
      return (
        <option key={location.id} value={location.id}>
          {name}
        </option>
      );
    });
    const accommodation_dropdown = accommodations.map((accommodation) => {
      const accommodation_name = `${accommodation.name}`;
      return (
        <option key={accommodation.id} value={accommodation.id}>
          {accommodation_name}
        </option>
      );
    });

    return (
      <div className="white-bg">
        <div className="formContainer">
          <div className="progressbar">
            <ul id="progressbar">
              <ToastContainer />
              <li
                className={activeStep == 1 ? "active" : ""}
                id="accomodation"
                onClick={(e) => this.handleJumpToStep(1)}
              >
                Create Accomodations
              </li>
              <li
                className={activeStep == 2 ? "active" : ""}
                id="rooms"
                onClick={(e) => this.handleJumpToStep(2)}
              >
                Create accomodation rooms
              </li>
            </ul>
          </div>
          <div className="multStepsWrapper">
            {activeStep == 1 && (
              <div className=" oneStep">
                <form className="flex-item">
                  <div className="input-wrapper">
                    <label htmlFor="hotelName">Hotel Name</label>
                    <div className="input-wrapper">
                      <div className="icon">
                        <img src={hotelIcon} />
                      </div>
                      <input
                        value={accomodation.name}
                        onChange={(e) =>
                          this.setState({
                            ...this.state,
                            accomodation: {
                              ...accomodation,
                              name: e.target.value,
                            },
                          })
                        }
                        type="text"
                        id="hotelName"
                        name="name"
                        className="form-control-accomodation"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="location">Location:</label>
                    <div className="input-wrapper">
                      <div className="icon">
                        <img src={locationIcon} />
                      </div>
                      <select
                        name="location_id"
                        className="form-control-accomodation"
                        id="location"
                        onSelect={(e) =>
                          this.setState({
                            ...this.state,
                            accomodation: {
                              ...accomodation,
                              location_id: e.target.value,
                            },
                          })
                        }
                      >
                        {options}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="image">Image</label>
                    <div className="input-wrapper">
                      <div className="icon">
                        <img src={imageIcon} />
                      </div>
                      <input
                        onChange={(e) =>
                          this.setState({
                            ...this.state,
                            accomodation: {
                              ...accomodation,
                              accommodation_image: e.target.files[0],
                            },
                          })
                        }
                        type="file"
                        id="accomo"
                        name="accomodationImages"
                        className="form-control-accomodation"
                      />
                    </div>
                  </div>
                  <div className="cordinates">
                    <div className="flex-item-input">
                      <label htmlFor="longitude">Longitude</label>
                      <div className="input-wrapper">
                        <div className="icon">
                          <img src={longitudeIcon} />
                        </div>
                        <input
                          value={accomodation.longitude}
                          onChange={(e) =>
                            this.setState({
                              ...this.state,
                              accomodation: {
                                ...accomodation,
                                longitude: e.target.value,
                              },
                            })
                          }
                          type="text"
                          id="longitude"
                          name="longitude"
                          className="form-control-accomodation"
                        />
                      </div>
                    </div>
                    <div className="flex-item-input">
                      <label htmlFor="latitude">Latitude</label>
                      <div className="input-wrapper">
                        <div className="icon">
                          <img src={latitudeIcon} />
                        </div>
                        <input
                          value={accomodation.latitude}
                          onChange={(e) =>
                            this.setState({
                              ...this.state,
                              accomodation: {
                                ...accomodation,
                                latitude: e.target.value,
                              },
                            })
                          }
                          type="text"
                          id="latitude"
                          name="latitude"
                          className="form-control-accomodation"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="description">Description</label>
                    <div className="input-wrapper">
                      <div className="icon">
                        <img src={descriptionIcon} />
                      </div>
                      <input
                        value={accomodation.description}
                        onChange={(e) =>
                          this.setState({
                            ...this.state,
                            accomodation: {
                              ...accomodation,
                              description: e.target.value,
                            },
                          })
                        }
                        type="text"
                        id="description"
                        name="description"
                        className="form-control-accomodation"
                      />
                    </div>
                  </div>
                </form>
                <div className="imagePreview">
                  <p>Image preview</p>
                  <div className="previewImage"></div>
                </div>
              </div>
            )}
            {activeStep == 2 && (
              <div className="oneStep">
                <form className="flex-item">
                  <div>
                    <label htmlFor="accommodation_id">Accommodation</label>
                    <div className="input-wrapper">
                      <div className="icon">
                        <img src={BedIcon} />
                      </div>
                      <select
                        name="accommodation_id"
                        className="form-control-accomodation"
                        id="accommodation_id"
                        onSelect={(e) =>
                          this.setState({
                            ...this.state,
                            accomodationRoom: {
                              ...accomodationRoom,
                              accommodation_id: e.target.value,
                            },
                          })
                        }
                      >
                        {accommodation_dropdown}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="bedType">Bed Type</label>
                    <div className="input-wrapper">
                      <div className="icon">
                        <img src={BedIcon} />
                      </div>
                      <input
                        value={accomodationRoom.bedType}
                        onChange={(e) =>
                          this.setState({
                            ...this.state,
                            accomodationRoom: {
                              ...accomodationRoom,
                              bedType: e.target.value,
                            },
                          })
                        }
                        type="text"
                        id="bedType"
                        name="bedType"
                        className="form-control-accomodation"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="pricing">Pricing</label>
                    <div className="input-wrapper">
                      <div className="icon">
                        <img src={pricing} />
                      </div>
                      <input
                        value={accomodationRoom.pricing}
                        onChange={(e) =>
                          this.setState({
                            ...this.state,
                            accomodationRoom: {
                              ...accomodationRoom,
                              pricing: e.target.value,
                            },
                          })
                        }
                        type="text"
                        id="pricing"
                        name="pricing"
                        className="form-control-accomodation"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="roomImage">Room Image</label>
                    <div className="input-wrapper">
                      <div className="icon">
                        <img src={imageIcon} />
                      </div>
                      <input
                        onChange={(e) =>
                          this.setState({
                            ...this.state,
                            accomodationRoom: {
                              ...accomodationRoom,
                              roomImage: e.target.files[0],
                            },
                          })
                        }
                        type="file"
                        id="roomImage"
                        name="roomImage"
                        className="form-control-accomodation"
                      />
                    </div>
                  </div>
                </form>
                <div className="imagePreview">
                  <p>Image preview</p>
                  <div className="previewImage"></div>
                </div>
              </div>
            )}
          </div>

          <div className="buttons-container">
            <div className="buttons-wrapper">
              {activeStep > 1 && (
                <button className="btn-multSteps" onClick={this.handlePrevious}>
                  Prev
                </button>
              )}
              <button className=" btn-multSteps" onClick={this.handleSubmit}>
                Save
              </button>
              {activeStep < 2 && (
                <button className="btn-multSteps" onClick={this.handleNext}>
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.auth.token,
});
export default connect(mapStateToProps)(CreateAccommodation);
