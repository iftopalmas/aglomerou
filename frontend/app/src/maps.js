import React from 'react';
import {
  GoogleMap,
  useLoadScript,
} from '@react-google-maps/api';
import mapStyles from './mapStyles';

const libraries = ['places'];
const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
};
const center = {
    lat: -10.184510,
    lng: -48.334660,
};

const options = {
    styles: mapStyles,
};


export default function App() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    });

    if (loadError) return 'Error loading Maps';
    if (!isLoaded) return 'Loading Maps';

    return <div>
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={12}
            center={center}
            options={options}>
        </GoogleMap>
    </div>;
}


