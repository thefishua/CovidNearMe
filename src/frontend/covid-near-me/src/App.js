import React from "react";
import SideBar from "./components/SideBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ActiveCases from "./pages/ActiveCases";
import Vaccinations from "./pages/Vaccinations";
import CovidTestingCentre from "./pages/CovidTestingCentre";

export default function App() {
    return <div> 
        <Router>
            <SideBar/>
                 <Switch>
                    <Route path='/' exact component={ActiveCases}/>
                    <Route path='/vaccination' component={Vaccinations}/>
                    <Route path='/testing' component={CovidTestingCentre}/>
                </Switch>
            
        </Router>
    </div>
  
}
