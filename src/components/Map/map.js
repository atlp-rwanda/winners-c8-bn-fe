import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import './map.css'
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'
import axiosInstance from '../../helpers/http';

const GOOGLEMAP = ({ accommodation, zoomLevel }) => {
  
  // const location={
  //   address: accommodation.name,
  //   lat: accommodation.latitude, 
  //   lng: accommodation.longitude,
  // }
  const [accommodationLocation, setAccommodationLocation] = useState('');
  useEffect(()=>{
    const fetchLocation = async () => {
      const result = await axiosInstance.get(`/locations/${accommodation.location_id}`);
      setAccommodationLocation(result.data.data.city);
    };
    fetchLocation();
  },[])

  const location={
    address: accommodationLocation,
    lat: -1.955648563380338, 
    lng: 30.062816427143513,
  }
  
    return ( 
    <div className="map">
        <h2 className="map-h2">Find Us</h2>
        <div className="google-map">
        <GoogleMapReact
            bootstrapURLKeys={{ key: '' }}
            defaultCenter={location}
            defaultZoom={zoomLevel}
            // center={location}
        >
            <LocationPin
            lat={location.lat}
            lng={location.lng}
            text={location.address}
            />
        </GoogleMapReact>
        </div>
    </div>
     );
}

const LocationPin = ({ text }) => (
    <div className="pin">
      <Icon icon={locationIcon} className="pin-icon" />
      <p className="pin-text">{text}</p>
    </div>
  )
export default GOOGLEMAP;