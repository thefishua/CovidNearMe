import React from "react";
import SideBar from "./sidebar/SideBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ActiveCases from "./pages/ActiveCases";
import Vaccinations from "./pages/Vaccinations";
import CovidTestingCentre from "./pages/CovidTestingClinic";
import Hotspots from "./pages/Hotspots";

export default function App() {
    return <div> 
        <Router>
            <SideBar/>
                 <Switch>
                    <Route path='/' exact component={ActiveCases}/>
                    <Route path='/vaccination' component={Vaccinations}/>
                    <Route path='/testing' component={CovidTestingCentre}/>
                    <Route path='/hotspots' component={Hotspots}/>
                </Switch>
            
        </Router>
    </div>
  
}
