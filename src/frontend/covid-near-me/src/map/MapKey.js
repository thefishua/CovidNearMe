import React from 'react'
import "./MapKey.css"
function MapKey() {
    return (
        <div className="box">
            <img 
                className = 'marker'
                src={"/mapbox-marker-icon-blue.svg"} 
                alt="Marker"> 
                
            </img>
            <img 
                className = 'marker'
                src={"/mapbox-marker-icon-red.svg"} 
                alt="Marker"> 
                
            </img>

            <img 
                className = 'marker'
                src={"/mapbox-marker-icon-orange.svg"} 
                alt="Marker"> 
                
            </img>

            <img 
                className = 'marker'
                src={"/mapbox-marker-icon-yellow.svg"} 
                alt="Marker"> 
            </img>

            <img 
                className = 'marker'
                src={"/mapbox-marker-icon-green.svg"} 
                alt="Marker"> 
            </img>
        </div>
    )
}

export default MapKey
