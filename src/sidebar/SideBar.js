import React, {useState} from 'react'
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import {Link} from "react-router-dom"
import {SideBarData} from './SideBarData'
import './SideBar.css'
import {IconContext} from 'react-icons'
function SideBar() {
    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)
    
    return (
        <>
            <IconContext.Provider value={{color: '#fff'}}>
                <div className="navbar">
                    <Link to="#" className="menu-bars">
                        {(sidebar === false) ?
                            <FaIcons.FaBars onClick={showSidebar}/>
                        : <AiIcons.AiOutlineClose onClick={showSidebar}/>}
                    </Link>
                    <h1 className="title"> CovidNearMe</h1>
                </div>
                <nav className={sidebar ? "nav-menu active": "nav-menu"}>
                    <ul className="nav-menu-items" onClick={showSidebar}>
                        
                        {/* Going through all the icons in the sideBarData file and displaying them
                            With the specified icon and the specified */}
                        {SideBarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>
                                            {item.title}
                                        </span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    )
}

export default SideBar;
