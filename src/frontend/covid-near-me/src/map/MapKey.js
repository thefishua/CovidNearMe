import React from 'react'
// import {MapKeyData} from './ActiveCaseMapKeyData'
import "./MapKey.css"
function MapKey(props) {
    return (
        <div className="box">
            <div className="box-title"> Key </div>
            <ul className="box-items">       
                {/* Going through all the map keys in the MapKeyData file and displaying them
                    With the specified image and the specified text*/}
                {props.MapKeyData.map((item, index) => {
                    return (
                        <li key={index} className={item.cName}>
                            {item.image}
                            <span>
                                {item.text}
                            </span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default MapKey
