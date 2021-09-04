import React from 'react'
import * as FcIcons from "react-icons/fc"

const KeySyle = {
    backgroundColor: 'red',
    paddingTop: 30,
    minHeight: 10,
    display: 'table-cell',
    verticalAlign: "middle",
}

export const MapKeyData = [
    {
        cName: 'key-text',
        image: <FcIcons.FcHome style={KeySyle}/>, 
        text: 'Covid Clinic'
    },
]