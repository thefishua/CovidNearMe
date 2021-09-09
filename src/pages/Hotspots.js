import React, {useState, useEffect} from "react";
import ReactMapGL, {Marker, Popup, GeolocateControl, NavigationControl} from "react-map-gl"
import * as hotspot from "../data/hotspots.json"
import {MapKeyData} from '../map/HotspotsMapKeyData'
import MapKey from "../map/MapKey";
import './Hotspots.css'



function Hotspots() {
    // Container for the mapbox 
    const [viewport, setViewport] = useState({
        // Default view for the map marked at Sydney
        // Below is the coordinates with 100% view and a zoom of 10
        latitude:  -33.865143,
        longitude: 151.209900,
        // Change these values to make the map smaller or bigger
        zoom: 10
    });

    // The Marker that is selected by the user 
    // Is set to false and then true when in use
    const [selectedMarker, setSelectedMarker] = useState(null);

    useEffect(()=> {
        // Enable the closing of a pop up 
        const listener = e => {
            if(e.key === "Escape") {
                setSelectedMarker(null);
            }
        };
        window.addEventListener("keydown", listener);
        // If the application is closed then remove this listener 
        return () => {
            window.removeEventListener("keydown", listener)
        }
    }, [])
    
    // Only rerender markers if props.data has changed
    // Marker for every hotspot that has been updated 
    const markers = React.useMemo(() => hotspot.data.monitor.map(
        region => (
            <Marker
            latitude={parseFloat(region.Lat)}
            longitude={parseFloat(region.Lon)}
            offsetLeft={-20} 
            offsetTop={-10}
            className="marker-btn"
            onClick={(e) =>{
                e.preventDefault()
                setSelectedMarker(region)
            }}
        >
            <img src={"/mapbox-marker-icon-red.svg"} alt="Marker"></img>
        </Marker>
        )
    ), []);

    const geoControlStyle = {
        right: 25,
        top: 10,
    };

    const navControlStyle = {
        top: 50,
        right: 25,
    }

    return (
        <div className='hotspot'>
            <MapKey MapKeyData={MapKeyData}/>
            <ReactMapGL
                {...viewport}
                width="100vw" 
                height="100vh"
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
                // Style of the map which is a simple darkmode 
                mapStyle = {"mapbox://styles/thefishua/cksu5uwz69phx17rkz3w54jq0"}
                onViewportChange={viewport => {setViewport(viewport)
                }}
                dragRotate = {false}
            >
            {/* Current location button */}
            <GeolocateControl 
                style = {geoControlStyle}
                positionsOptions = {{enableHighAccuracy:true}}
                trackUserLocation={true}
                showAccuracyCircle = {true}
                fitBoundsOptions = {{maxZoom: 12.5}}
                
            />
            {/* Map zoom in tools */}
            <NavigationControl
                style = {navControlStyle}
                showCompass = {false}
            />
                {markers}
                {selectedMarker ? (
                    <Popup 
                        /**
                         * Details for the Popup 
                         */
                        latitude={parseFloat(selectedMarker.Lat)}
                        longitude={parseFloat(selectedMarker.Lon)}
                        onClose={()=>{
                            setSelectedMarker(null)
                        }}
                    >
                        <div>
                            <h2>{selectedMarker.Venue}</h2>
                            <h3> Address: {selectedMarker.Address}, {selectedMarker.Suburb}</h3>
                            <h3> Time: {selectedMarker.Date} betweem {selectedMarker.Time}</h3>
                            <h3> Alert: {selectedMarker.Alert}</h3>
                        </div>
                    </Popup>
                ) : null}

            </ReactMapGL>
        </div>
    )
}

export default Hotspots
