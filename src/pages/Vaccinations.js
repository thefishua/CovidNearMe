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

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
        return (
            <div className="custom-tooltip">
                <p className="tooltip-label">
                    {`Date: ${label}`}
                </p>
                <p className="tooltip-people-fully-vaccinated">
                    {`People Fully Vaccinated: ${payload[0].value}`}
                </p>
                <p className="tooltip-people-partially-vaccinated">
                    {`People Partially Vaccinated : ${payload[1].value}`}
                </p>
            </div>
        );
    }
    return null;
};

function Vaccinations() {
    return (
        <div className="vaccination-background">
            <div className="vaccination-title">
                Vaccinations
            </div>
            <h3 className="vaccination-book">
                Book a Vaccination: <a className="vaccination-link" href="https://covid-vaccine.healthdirect.gov.au/eligibility?lang=en" target='_blank' rel="noreferrer">Here</a>
            </h3>
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
                        <XAxis 
                            dataKey="date" 
                            ticks={[firstElement.date,midElement.date,lastElement.date]}
                        />
                        <YAxis 
                            dataKey="total_vaccinations" 
                            ticks={vaccine['Australian Population']}
                        />
                        <Tooltip 
                            content={<CustomTooltip/>}
                        />
                        <Legend 
                            wrapperStyle={{bottom: -20}}
                        />
                        <Bar 
                            name="Fully Vaccinated" 
                            dataKey="people_fully_vaccinated" 
                            barSize={20} 
                            fill="#8884d8" 
                        />
                        <Area 
                            name="Partially Vaccinated" 
                            type="monotone" 
                            dataKey="people_vaccinated" 
                            fill="#8884d8" 
                            stroke="#8884d8" 
                        />
                        <ReferenceLine 
                            y={vaccine['Australian Population'] * 0.8} 
                            label= {{
                                position: "top",
                                value: "80% of 16+ population",
                                fill: "#FFF",
                                fontSize: "16px"
                            }}
                            stroke="red" 
                            strokeDasharray="3 3" 
                        />
                        <ReferenceLine 
                            y={vaccine['Australian Population'] * 0.7} 
                            label= {{
                                position: "top",
                                value: "70% of 16+ population",
                                fill: "#FFF",
                                fontSize: "16px"
                            }}
                            stroke="red" 
                            strokeDasharray="3 3" 
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
            <div className="vaccination-info">
                    The number of Australians that are fully vaccinated is currently <div className="vaccination-number">{(lastElement.people_fully_vaccinated/vaccine['Australian Population'] * 100).toFixed(0)}% </div> 
                    of the Australian population. The federal government's <a className="vaccination-link" href="https://www.theguardian.com/news/datablog/2021/feb/28/is-australias-goal-of-vaccinating-the-entire-adult-population-by-october-achievable" target='_blank' rel="noreferrer"> original rollout goal </a> 
                    has turned towards a <div className="vaccination-number">70%</div> and <div className="vaccination-number">80%</div> vaccination threshold for returning to ordinary life.
                    Currently there is a total of <div className="vaccination-number"> {lastElement.total_vaccinations} </div> people vaccinated with <div className="vaccination-number">{(lastElement.people_vaccinated/lastElement.total_vaccinations * 100).toFixed(0)}% </div> of these people partially 
                    vaccinated and <div className="vaccination-number"> {(lastElement.people_fully_vaccinated/lastElement.total_vaccinations * 100).toFixed(0)}% </div> fully vaccinated.
                    Whereas, the percentage of people that have been adminstrated boosters is <div className="vaccination-number"> {(lastElement.total_boosters/lastElement.total_vaccinations * 100).toFixed(0)}%</div>.
            </div>
        </div>
    )
}

export default Vaccinations
