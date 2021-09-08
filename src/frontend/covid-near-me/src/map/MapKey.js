import React from 'react';
// import {MapKeyData} from './ActiveCaseMapKeyData'
import Collapsible from 'react-collapsible';
import "./MapKey.css";
function MapKey(props) { 
    
    return (
    <div className="box">
      <Collapsible 
        trigger="Key" 
        className='box-title'
        triggerClassName="closedTitle"
        triggerOpenedClassName="openTitle"    
        openedClassName="box-title-open"

    >
        <div className="box-items">
          {key(props)}
        </div>
      </Collapsible>
    </div>

    );
}

function key(props) {
    return (
        props.MapKeyData.map((item, index) => {
            return (
                <li key={index} className={item.cName}>
                    {item.image}
                    <span>
                        {item.text}
                    </span>
                </li>
            )
        })
    )
}


export default MapKey
