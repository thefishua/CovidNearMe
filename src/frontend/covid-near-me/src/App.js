import React, {useState, useEffect} from "react";
import ReactMapGL, {Marker, Popup} from "react-map-gl"
import * as lga from "./data/nsw_lga.json"
export default function App() {
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

    return <div> 
        {/* Using the ReactMapGL API to create the map */}
        <ReactMapGL 
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
            mapStyle = "mapbox://styles/thefishua/cksu5uwz69phx17rkz3w54jq0"
            onViewportChange={viewport => {setViewport(viewport)
            }}
        >
            {/* from data lga JSON from list map as a region 
                A marker is added to that region*/}
            {lga.list.map((region) => (
                <Marker 
                    key={region.LGA_CODE19} 
                    latitude={region.latitude} 
                    longitude={region.longitude} 
                >
                    <button 
                        className="caution-btn"
                        onClick={(e) =>{
                        e.preventDefault()
                        setSelectedMarker(region)
                        }}
                    > 
                        <img src="/mapbox-marker-icon-red.svg" alt="Caution Marker"/>
                    </button>
                </Marker>
            ))}

            {selectedMarker ? (
                <Popup 
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
