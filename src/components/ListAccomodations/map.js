import React from 'react'
import GoogleMapReact from 'google-map-react'
import './map.css'
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'

const GOOGLEMAP = ({ location, zoomLevel }) => {
    return ( 
    <div className="map">
        <h2 className="map-h2">Come Visit Us</h2>

        <div className="google-map">
        <GoogleMapReact
            bootstrapURLKeys={{ key: '' }}
            defaultCenter={location}
            defaultZoom={zoomLevel}
            center={location}
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