import React from 'react'
import * as FaIcons from "react-icons/fa"
import * as GoIcons from "react-icons/go"
import * as IOIcons from "react-icons/io"

export const SideBarData = [
   {
      title: 'Active Cases', 
      path: '/', 
      icon: <FaIcons.FaBriefcaseMedical/>,
      cName: 'nav-text' 
   },
   {
      title: 'HotSpots', 
      path: '/hotspots', 
      icon: <GoIcons.GoFlame/>,
      cName: 'nav-text' 
   },
   {
      title: 'Vaccinations', 
      path: '/vaccination', 
      icon: <IOIcons.IoIosPaper/>,
      cName: 'nav-text' 
   },
   {
      title: 'Covid Testing Clinics', 
      path: '/testing', 
      icon: <IOIcons.IoMdPeople/>,
      cName: 'nav-text' 
   },
]