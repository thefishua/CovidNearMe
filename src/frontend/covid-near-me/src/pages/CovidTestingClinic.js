import React, {useState, useEffect}from 'react'
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import * as clinic from "../data/covid_testing_clinic.json"
import "./CovidTestingClinic.css"
function CovidTestingClinic() {
    // Array of days of the week to show the relevant time a clinic is open on a certain day
    const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
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
    const markers = React.useMemo(() => clinic.result.records.map(
        region => (
            (region.Latitude !== null && region.Longitude !==null) ? <Marker
                key={region._id}
                latitude={parseFloat(region.Latitude)}
                longitude={parseFloat(region.Longitude)}
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
        : null)
    ), []);

    return (
        <div className='clinic'>
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
                {markers}
                {selectedMarker ? (
                    <Popup 
                        /**
                         * Details for the Popup 
                         */
                        latitude={parseFloat(selectedMarker.Latitude)}
                        longitude={parseFloat(selectedMarker.Longitude)}
                        onClose={()=>{
                            setSelectedMarker(null)
                        }}
                    >
                        <div>
                            <h2>
                                {selectedMarker.title}
                            </h2>
                            <h3> 
                                Address: {selectedMarker["Clinic Address (field_clinic_address:address_line1)"]}, {selectedMarker["Suburb"]}
                            </h3>
                            <h3> 
                                Today Opening Hours: {selectedMarker["Clinic "+ day[new Date().getDay()] + " opening hours"]}
                            </h3>
                            {(selectedMarker["Clinic Phone"] !== null) ? 
                                <h3> 
                                    Phone: {selectedMarker["Clinic Phone"]} 
                                </h3> 
                            : null}
                            {(selectedMarker["Clinic Website"] !== null) ? 
                                <h3> 
                                    Website: <a href={selectedMarker["Clinic Website"]} target='_blank' rel="noreferrer"> {selectedMarker.title} website </a> 
                                </h3> 
                            : null}
                        </div>
                    </Popup>
                ) : null}
            </ReactMapGL>
        </div>
    )
}

export default CovidTestingClinic

