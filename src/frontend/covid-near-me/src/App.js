import React, {useState, useEffect} from "react";
import ReactMapGL, {Marker, Popup} from "react-map-gl"
import * as lga from "./data/nsw_lga.json"
export default function App() {
    // Container for the mapbox 
    const [viewport, setViewport] = useState({
        // Default view for the map marked at Sydney
        // Below is the coordinates with 100% view and a zoom of 10
        latitude:  -33.865143,
        longitude: 151.209900,
        // Change these values to make the map smaller or bigger
        width: '80vw', 
        height: '100vh',
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

    // Simple function using if and else to dictate whether the lga has
    // a high number of cases, medium number of cases and low number of cases
    // returns a red marker cases >= 500, a yellow marker cases > 0, orange cases > 100 else a green marker
    function LgaMarker(activeCases) {
        if (activeCases >= 1000) {
            return "/mapbox-marker-icon-purple.svg";
        } else if(activeCases >= 500) {
            return "/mapbox-marker-icon-red.svg";
        } else if (activeCases >= 100) {
            return "/mapbox-marker-icon-orange.svg";
        } else if (activeCases > 0) {
            return "/mapbox-marker-icon-yellow.svg";
        }
        return "/mapbox-marker-icon-green.svg";
    }
    // Depending on the time of day will change the map from a light or dark style 
    // Will be on AEST time 
    function dynamicMap() {
        let currentTime = new Date();
        // After 6pm then display night mode
        if((currentTime.getHours() >= 18 && currentTime.getHours() <= 24) || (currentTime.getHours() > 0 && currentTime.getHours() < 5)) return "mapbox://styles/thefishua/cksu5uwz69phx17rkz3w54jq0"
        return "mapbox://styles/thefishua/ckswy2t14ceu417rkp5014f0l"
    }

    return <div> 
        {/* Using the ReactMapGL API to create the map */}
        <ReactMapGL 
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
            // Style of the map which is a simple darkmode 
            mapStyle = {dynamicMap()}
            onViewportChange={viewport => {setViewport(viewport)
            }}
            dragRotate = {false}
        >
            {/* from data lga JSON from list map as a region 
                A marker is added to that region*/}
            {lga.list.map((region) => (
                <Marker 
                    /**
                     * Details for the marker 
                     */
                    key={region.LGA_CODE19} 
                    latitude={region.latitude} 
                    longitude={region.longitude} 
                    offsetLeft={-20} 
                    offsetTop={-10}
                    className="marker-btn"
                    onClick={(e) =>{
                        e.preventDefault()
                        setSelectedMarker(region)
                    }}
                >
                    <img src={LgaMarker(region.active_cases)} alt="Marker"/>
                </Marker>
            ))}
            
            {selectedMarker ? (
                <Popup 
                    /**
                     * Details for the Popup 
                     */
                    latitude={selectedMarker.latitude}
                    longitude={selectedMarker.longitude}
                    onClose={()=>{
                        setSelectedMarker(null)
                    }}
                >
                    <div>
                        <h2>{selectedMarker.LGA_NAME19}</h2>
                        <p> Active Cases: {selectedMarker.active_cases}</p>
                    </div>
                </Popup>
            ) : null}
        </ReactMapGL>
    </div>
  
}
