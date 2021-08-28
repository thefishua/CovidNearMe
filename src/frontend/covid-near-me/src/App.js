import React, {useState} from "react";
import ReactMapGL from "react-map-gl"
import * as lga from "./data/nsw_lga.json"
export default function App() {
    const [viewport, setViewport] = useState({
        // Default view for the map marked at Sydney
        // Below is the coordinates with 100% view and a zoom of 10
        latitude:  -33.865143,
        longitude: 151.209900, 
        width: '100vw', 
        height: '100vh',
        zoom: 10
    } 
);
    return <div> 
        {/* Using the ReactMapGL API to create the map */}
        <ReactMapGL 
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
            mapStyle = "mapbox://styles/thefishua/cksu5y7700anc18pezdfoxgcl"
            onViewportChange={viewport => {setViewport(viewport)
            }}
        >
            {lga.list.map((region) => (
                <Marker key={region.LGA_CODE19} >
                    <div> LGA </div>
                </Marker>
            ))}
        </ReactMapGL>
    </div>
  
}
