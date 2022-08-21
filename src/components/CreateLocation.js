import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import locationIcon from '../../public/images/icons/locationIcon.svg';
import provinceIcon from '../../public/images/icons/province.svg';
import cityIcon from '../../public/images/icons/city.svg';

class CreateLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        country: '',
        province: '',
        city: '',
      },
    };
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${this.props.token}`);

    const { country, city, province } = this.state.location;
    let raw = JSON.stringify({ country, city, province });
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    this.setState({ wait: true });
    toast('Creating location . . .', {
       position: toast.POSITION.TOP_CENTER,
       });
    let result = await fetch(
      'https://winners-c8-bn-be-staging.herokuapp.com/api/locations',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.props.token}`,
        },
        method: 'POST',
        body: JSON.stringify({ country, province, city }),
      }
    ).then((response) => response.json());

    this.setState({ responseMessage: result.message });
    toast.dismiss();

    if (result.status == 200) {
      toast.success('	The Location is successfully created.', {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error(result.message || result.error, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  render() {
    const { location } = this.state;
    return (
      <div className="white-bg">
        <div className="formContainer">
          <ToastContainer />
          <form className="flex-item">
            <h3 class="mb-32">CREATE LOCATION</h3>
            <div>
              <label htmlFor="country">Country</label>
              <div className="input-wrapper">
                <div className="icon">
                  <img src={locationIcon} />
                </div>
                <input
                  value={location.country}
                  onChange={(e) =>
                    this.setState({
                      ...this.state,
                      location: { ...location, country: e.target.value },
                    })
                  }
                  type="text"
                  id="country"
                  name="country"
                  className="form-control-accomodation"
                  data-testid="create-location-country"
                />
              </div>
            </div>
            <div>
              <label htmlFor="province">Province</label>
              <div className="input-wrapper">
                <div className="icon">
                  <img src={provinceIcon} />
                </div>
                <input
                  value={location.province}
                  onChange={(e) =>
                    this.setState({
                      ...this.state,
                      location: { ...location, province: e.target.value },
                    })
                  }
                  type="text"
                  id="province"
                  name="province"
                  className="form-control-accomodation"
                  data-testid="create-location-province"
                />
              </div>
            </div>
            <div>
              <label htmlFor="city">City</label>
              <div className="input-wrapper">
                <div className="icon">
                  <img src={cityIcon} />
                </div>
                <input
                  value={location.city}
                  onChange={(e) =>
                    this.setState({
                      ...this.state,
                      location: { ...location, city: e.target.value },
                    })
                  }
                  type="text"
                  id="city"
                  name="city"
                  className="form-control-accomodation"
                  data-testid="create-location-city"
                />
              </div>
            </div>
            {/* <div className="buttons-container"> */}
            <div className="buttons-wrapper">
              <button
                className="save_location "
                value="save"
                onClick={this.handleSubmit}
                data-testid="save-location"
              >
                Save
              </button>
            </div>
            {/* </div> */}
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.auth.token,
});
export default connect(mapStateToProps)(CreateLocation);
