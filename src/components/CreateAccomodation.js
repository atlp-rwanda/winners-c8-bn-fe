import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import hotelIcon from '../../public/images/icons/hotel.svg';
import imageIcon from '../../public/images/icons/image.svg';
import longitudeIcon from '../../public/images/icons/longitude.svg';
import latitudeIcon from '../../public/images/icons/latitude.svg';
import descriptionIcon from '../../public/images/icons/description.svg';
import locationIcon from '../../public/images/icons/locationIcon.svg';

class CreateAccommodation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accomodation: {
        name: '',
        accommodation_image: '',
        location_id: '',
        longitude: '',
        latitude: '',
        description: '',
      },
      locations: [],
      accommodations: [],
      imagePreview: '',
      imageToSend: '',
    };
  }
  handleChange = (e) => {
    this.setState({
      ...this.state,
      accomodation: {
        ...this.state.accomodation,
        accommodation_image: e.target.files[0],
      },
      imagePreview: URL.createObjectURL(e.target.files[0]),
      imageToSend: e.target.files[0],
    });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const { accomodation } = this.state;
    let myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${this.props.token}`);
    const form = new FormData();
    for (let key in accomodation) {
      form.append(key, accomodation[key]);
      console.log(key, accomodation[key]);
    }
    this.setState({ wait: true });
    toast('Creating accommodation . . .', {
      position: toast.POSITION.TOP_CENTER,
    });

    let result = await fetch(
      `${process.env.BASE_BACKEND_SERVER_URL}/accommodations/ `,
      {
        headers: myHeaders,
        method: 'POST',
        body: form,
      }
    ).then((response) => response.json());

    if (result.status == 201) {
      console.log(result);
      toast.success('Accommodation facility created successfully', {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error(result.message || result.error, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  componentDidMount() {
    const token = window.localStorage.getItem('auth-token');

    const url = process.env.BASE_BACKEND_SERVER_URL;
    fetch(`${url}/locations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
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
    const url_accommodation = `${url}/accommodations/`;
    fetch(url_accommodation, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
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
    const { accomodation, locations } = this.state;
    const options = locations?.map((location, index) => {
      const name = `${location.city}, ${location.country}`;
      return (
        <option key={location.id} value={location.id} selected={index == 0}>
          {name}
        </option>
      );
    });

    return (
      <div className="white-bg">
        <div className="formContainer">
          <div className="progressbar">
            <ul id="progressbar">
              <ToastContainer />
              <li className="active" id="accomodation">
                Create Accomodations
              </li>
            </ul>
          </div>
          <div className="multStepsWrapper">
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
                      data-testid="create-hotel-name"
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
                      onChange={(e) => {
                        this.setState({
                          ...this.state,
                          accomodation: {
                            ...accomodation,
                            location_id: e.target.value,
                          },
                        });
                      }}
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
                      onChange={(e) => {
                        this.handleChange(e);
                      }}
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
                      data-testid="create-description"
                    />
                  </div>
                </div>
              </form>
              <div className="imagePreview">
                <p>Image preview</p>
                <div className="previewImage">
                  <img src={this.state.imagePreview} alt="image" />
                </div>
              </div>
            </div>
          </div>

          <div className="buttons-container">
            <div className="buttons-wrapper">
              <button className=" btn-multSteps" onClick={this.handleSubmit}>
                Save
              </button>
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
