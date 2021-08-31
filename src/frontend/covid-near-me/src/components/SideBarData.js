import React from 'react'
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as IOIcons from "react-icons/io"

export const SideBarData = [
    {
       title: 'Active Cases', 
       path: '/', 
       icon: <FaIcons.FaBriefcaseMedical/>,
       cName: 'nav-text' 
    },
    {
        title: 'Vaccinations', 
        path: '/vaccination', 
        icon: <IOIcons.IoIosPaper/>,
        cName: 'nav-text' 
     },
     {
        title: 'Covid Testing Centre', 
        path: '/testing', 
        icon: <IOIcons.IoMdPeople/>,
        cName: 'nav-text' 
     },
]