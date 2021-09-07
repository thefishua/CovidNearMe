import React from 'react'
import * as vaccine from "../data/vaccine.json"
import {
    Line, 
    XAxis, 
    YAxis,  
    Tooltip, 
    Legend, 
    ResponsiveContainer, 
    ComposedChart,
    Area,
    Bar,
    ReferenceLine
} from 'recharts';
import "./Vaccination.css"

// Elements of vaccine from json file
var lastElement = vaccine.list[vaccine.list.length - 1]
var midElement = vaccine.list[vaccine.list.length/2]
var firstElement = vaccine.list[0]


function Vaccinations() {
    return (
        <div className="vaccination-background">
            <div className="vaccination-title">
                Vaccination
            </div>
            <div className="vaccination-graph">
                <ResponsiveContainer width="90%" height="90%" aspect={3}>
                    <ComposedChart
                        data={vaccine.list}
                        margin={{ 
                            top: 20, 
                            right: 30, 
                            left: 100, 
                            bottom: 10 
                        }}
                    >
                        <XAxis dataKey="date" ticks={[firstElement.date,midElement.date,lastElement.date]}/>
                        <YAxis dataKey="total_vaccinations" ticks={vaccine['Australian Population']}/>
                        <Tooltip/>
                        <Legend wrapperStyle={{top: 0}}/>
                        <Line type="monotone" dataKey="total_vaccinations" stroke="#f08e33" activeDot={{ r: 8 }} />
                        <Bar dataKey="people_fully_vaccinated" barSize={20} fill="#8884d8" />
                        <Area type="monotone" dataKey="people_vaccinated" fill="#8884d8" stroke="#8884d8" />
                        <ReferenceLine y={vaccine['Australian Population'] * 0.8} label="80% of 16+ population" stroke="red" strokeDasharray="3 3" segment={[{ x: lastElement.date, y: lastElement.people_fully_vaccinated }, { x: vaccine['80_people_vaccinated'].date, y: vaccine['80_people_vaccinated'].total_vaccinations }]}/>
                        <ReferenceLine y={vaccine['Australian Population'] * 0.7} label="70% of 16+ population" stroke="red" strokeDasharray="3 3"/>
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
            <li className="vaccination-info">
                <li> 
                    Australian Population: {vaccine['Australian Population'] * 0.8} People
                </li>
                <li> 
                    Total Vaccinations: {lastElement.total_vaccinations} People
                </li>
                <li> 
                    Percentage Partially Vaccinated: {(lastElement.people_vaccinated/lastElement.total_vaccinations * 100).toFixed(0)}%
                </li>
                <li> 
                    Percentage Fully Vaccinated: {(lastElement.people_fully_vaccinated/lastElement.total_vaccinations * 100).toFixed(0)}%
                </li>
                <li> 
                    Percentage Boosted: {(lastElement.total_boosters/lastElement.total_vaccinations * 100).toFixed(0)}%
                </li>
            </li>
        </div>
    )
}

export default Vaccinations
