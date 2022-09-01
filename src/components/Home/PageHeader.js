import React from 'react';
import '../../../public/styles/Home/pageHeader.scss';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ApartmentIcon from '@mui/icons-material/Apartment';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import landing_photo from '../../../public/images/landing_page.png';

function PageHeader() {
  const backgroundStyle = {
    backgroundColor: `rgba(0, 0, 0, 0.493)`,
    backgroundImage: `url(${landing_photo})`,
    backgroundBlendMode: 'darken',
  };
  return (
    <section className="page-header" style={backgroundStyle}>
      <header>
        <h1>
          Explore New <br />
          Places
        </h1>
        <span>Enjoy every good moment</span>
      </header>

      <div className="quick-actions">
        <div className="actions-headers">
          <div className="header active">
            <FlightTakeoffIcon fontSize="inherit" />
            <span>Travel</span>
          </div>
          <div className="header">
            <ApartmentIcon fontSize="inherit" />
            <span>Hotel</span>
          </div>
        </div>
        <div className="actions-body">
          <div className="actions-option active">
            <form>
              <div className="form-group">
                <div className="label">
                  <LocationOnIcon fontSize="inherit" />
                  <span>Destination</span>
                </div>
                <input type="text" placeholder="Kigali, Rwanda"></input>
              </div>
              <div className="form-group">
                <div className="label">
                  <InsertInvitationIcon fontSize="inherit" />
                  <span>When to start?</span>
                </div>
                <input type="date"></input>
              </div>
              <div className="form-group">
                <div className="label">
                  <EventAvailableIcon fontSize="inherit" />
                  <span>When to end?</span>
                </div>
                <input type="date"></input>
              </div>
              <button type="submit" className="actions-btn">
                Find
              </button>
            </form>
          </div>

          <div className="actions-option">
            <form>
              <div className="form-group">
                <div className="label">
                  <LocationOnIcon fontSize="inherit" />
                  <span>Destination</span>
                </div>
                <input type="text" placeholder="Kigali, Rwanda"></input>
              </div>
              <div className="form-group">
                <div className="label">
                  <InsertInvitationIcon fontSize="inherit" />
                  <span>When to start?</span>
                </div>
                <input type="date"></input>
              </div>
              <div className="form-group">
                <div className="label">
                  <EventAvailableIcon fontSize="inherit" />
                  <span>When to end?</span>
                </div>
                <input type="date"></input>
              </div>
              <button type="submit" className="actions-btn">
                Find
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PageHeader;
