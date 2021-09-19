import React, {useState, useEffect, useRef} from "react";
import ReactMapGL, {FlyToInterpolator, Marker, Popup, GeolocateControl, NavigationControl} from "react-map-gl";
//import * as lga from "../data/nsw_lga.json"
import useSupercluster from "use-supercluster";
import {MapKeyData} from '../map/ActiveCaseMapKeyData'
import MapKey from "../map/MapKey";
//import useSwr from "swr";
import axios from "axios";

import "../index.css";
import "../mapbox-gl.css"

// const fetcher = (...args) => await fetch(...args).then(response => await response.json());

const url = "https://covid-near-me.herokuapp.com/api/active"

function ActiveCases() {
    // Container for the mapbox 

    
    const [viewport, setViewport] = useState({
        // Default view for the map marked at Sydney
        // Below is the coordinates with 100% view and a zoom of 10
        latitude:  -33.865143,
        longitude: 151.209900,
        width: "100vw", 
        height: "100vh",
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

    //const { data, error } = useSwr(url, { fetcher });
    //const lga = data && !error ? data.slice(0, 2000) : [];
    
    async function getMeData() {
        await axios.get(url)
        .then((response) => {
            console.log(response.data);
            const lga = response.data;
            return lga;
        })
        .catch((err) => { })
        
    }

    const lga = getMeData();
    console.log(lga);
    const mapRef = useRef();
    
    // This defines all the points on the map
    const points = lga.list.map(region => ({
        type: "Feature",
        properties: {
            cluster: false,
            lgaId: region.LGA_CODE19,
            lgaName: region.LGA_NAME19,
            active_cases: region.active_cases
        },
        geometry: {
            type: "Point",
            coordinates: [
                region.longitude,
                region.latitude
            ]
        }
    }));

    // gets the current bounds of the map
    // it is used to calculate the clusters
    const bounds = mapRef.current
    ? mapRef.current
        .getMap()
        .getBounds()
        .toArray()
        .flat()
    : null;

    // Defines all the clusters on the map 
    const { clusters, supercluster } = useSupercluster({
        points,
        bounds,
        zoom: viewport.zoom,
        options: {
            radius: 75,
            maxZoom: 20
        },
    });

    const geoControlStyle = {
        right: 25,
        top: 10,
    };

    const navControlStyle = {
        top: 50,
        right: 25,
    }


    return (
        <div className='active-case'>
            <MapKey MapKeyData={MapKeyData}/>
            <ReactMapGL 
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
                // Style of the map which is a simple darkmode 
                mapStyle = {"mapbox://styles/thefishua/cksu5uwz69phx17rkz3w54jq0"}
                onViewportChange={viewport => {setViewport(viewport)
                }}
                dragRotate = {false}
                ref = {mapRef}
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

                {/* So instead of mapping Markers we are mapping cluster, and
                depending on isCluster, returning a cluster node if true, or a 
                normal marker if false */}
                {clusters.map(cluster => {
                    const [longitude, latitude] = cluster.geometry.coordinates;
                    const { 
                        cluster: isCluster, 
                        point_count: pointCount
                    } = cluster.properties;
                
                    if (isCluster) {
                        return (
                            <Marker 
                                key = {cluster.id}
                                latitude = {latitude}
                                longitude = {longitude}
                                offsetLeft={Math.min(-50, -0.5 * pointCount)}
                                offsetTop={-10}
                            >
                                <div 
                                    className = "cluster-number"
                                    style={{
                                        width: `${10 + (pointCount / points.length) * 100}px`,
                                        height: `${10 + (pointCount / points.length) * 100}px`,
                                        color: `white`,
                                    }}   
                                    onClick = {() => {
                                        const expansionZoom = Math.min(supercluster.getClusterExpansionZoom(cluster.id),
                                        20);
                                        setViewport({
                                            ...viewport,
                                            latitude,
                                            longitude,
                                            zoom: expansionZoom,
                                            transitionInterpolator: new FlyToInterpolator({
                                                speed: 2,
                                            }), 
                                            transitionDuration : "auto"
                                        });

                                    }}
                                >
                                    <img 
                                    className = 'cluster-marker'
                                    src={"/mapbox-marker-icon-blue.svg"} 
                                    alt="Marker"
                                    />
                                    
                
                            </div> 
                            {/* <div className = "cluster-number">{pointCount}</div> */}
                            </Marker>
                        )
                    }


                    return (
                        <Marker 
                            /**
                             * Details for the marker 
                             */
                            key={cluster.properties.lgaId} 
                            latitude={latitude} 
                            longitude={longitude} 
                            offsetLeft={-20} 
                            offsetTop={-10}
                            className="marker-btn"
                            onClick={(e) =>{
                                e.preventDefault()
                                setSelectedMarker(cluster)
                            }}
                        >
                            <img src={LgaMarker(cluster.properties.active_cases)} alt="Marker"/>
                        </Marker>
                    );
                })}
                
                {selectedMarker ? (
                    <Popup 
                        /**
                         * Details for the Popup 
                         */
                        longitude = {selectedMarker.geometry.coordinates[0]}
                        latitude = {selectedMarker.geometry.coordinates[1]}
                        onClose={()=>{
                            setSelectedMarker(null)
                        }}
                    >
                        <div>
                            <h2>{selectedMarker.properties.lgaName}</h2>
                            <p> Active Cases: {selectedMarker.properties.active_cases}</p>
                        </div>
                    </Popup>
                ) : null}
            </ReactMapGL>
        </div>
    )
}

export default ActiveCases
