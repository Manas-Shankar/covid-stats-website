import Head from 'next/head'
import React, {useEffect } from 'react';
import useFetch from 'use-http';
import millify from 'millify';
import PopUp from './popUp';
import style from '../components/styles.module.css';
import moment from "moment";

const MillifyOptions = {
  precision:3,
  space:true
};

let url = "https://covid-server-app.herokuapp.com/data";
export default function Home() {
  const [serverData,changeServerData] = React.useState([]);
  const [regionData,changeRegionData] = React.useState([]);
  const [lastUpdatedAt,changeLastUpdatedAt] = React.useState("");
  const { get, post, response, loading, error } = useFetch(url)
  const [show_detailed_view,changeView] = React.useState(false);

  async function loadStats() {
    const data = await get('')
    console.log(data)
    if (response.ok) 
    { 
      changeServerData(data)
      changeRegionData(data[2])
      let date = moment(data[3]).format("MMMM d, YYYY");
      console.log(date)
      changeLastUpdatedAt(data[3])
    }
  }

  const handleClick = ()=>{
    changeView(true);
  }

  useEffect(() => {loadStats()}, [])
  if (serverData !== null)
  {
    return (
      <div className={style.container}>
     
        <Head>
          <title>COVID-19 statistics</title>
        </Head>
  
        <main>

        {
       show_detailed_view===true ? 
       (<PopUp 
       toggle={changeView}
       regionData = {regionData.map(item=>{
         return item.region
       })}                                                                 
        />) : 
       (null)
      }
          <h1 className={style.title}>
            COVID-19 statistics for India and the World
          </h1>
         
          <p className={style.description}>
            This website was created to view statistics of the COVID-19 pandemic 
            in India and its states, as well as total statistics for the World.
            <br/>
            Statistics were last updated on <span className={style.lastUpdated}>{lastUpdatedAt}</span>.
          </p>
          <div className={style.statButtons}>
          <button className={style.regionButton}><a  href="#region-statistics">REGION WISE STATISTICS</a> </button>
          <button className={style.regionButton1} onClick={()=>{handleClick()}}>DAILY NOTIFICATIONS</button>
          </div>
          <div className={style.mainStats}>
            <div className={`${style.card} ${style.worldSection}`}>
              {serverData.map((item,index)=>{
                if(index==0)
                {
                  return (
                    <div className={style.worldStats}>
                    <h1 className={style.title_stats}>WORLD STATISTICS</h1>
                    <div className={style.worldDetails}>
                      <h3>Active cases: {millify(item.activeCases,MillifyOptions)}</h3>
                      <h3>New cases: {millify(item.newCases,MillifyOptions)}</h3>
                      <h3>New deaths: {millify(item.newDeaths,MillifyOptions)}</h3>
                      <h3>Serious/Critical cases : {millify(item.seriousCritical,MillifyOptions)}</h3>
                      <h3>Cases per million : {millify(item.casesPerMil,MillifyOptions)}</h3>
                      <h3>Deaths per million : {millify(item.deathsPerMil,MillifyOptions)}</h3>
                      <h3>Total Worldwide Cases : {millify(item.totalCases,MillifyOptions)}</h3>
                      <h3>Total Worldwide deaths : {millify(item.totalDeaths,MillifyOptions)}</h3>
                      <h3>Total WorldWide Recoveries : {millify(item.totalRecovered,MillifyOptions)}</h3>
                    </div>
                    </div>
                  )  
                }
              })}
            </div>
            <div className={`${style.card} ${style.indiaSection}`}>
              {
                serverData.map((item,index)=>{
                  if(index==1)
                  {
                    {/* console.log(item) */}
                    return (
                    <div className={style.indiaStats}>
                    <h1 className={style.title_stats}>INDIA STATISTICS</h1>
                    <div className={style.indiaDetails}>
                        <h3>Active cases: {millify(item.activeCases,MillifyOptions)}</h3>
                        <h3>New Active cases : {millify(item.activeCasesNew,MillifyOptions)}</h3>
                        <h3>Deaths : {millify(item.deaths,MillifyOptions)}</h3>
                        <h3>New Deaths : {millify(item.deathsNew,MillifyOptions)}</h3>
                        <h3>Recovered cases : {millify(item.recovered,MillifyOptions)}</h3>
                        <h3>New Recovered cases : {millify(item.recoveredNew,MillifyOptions)}</h3>
                        <h3>Previous day tests : {millify(item.previousDayTests,MillifyOptions)}</h3>
                        <h3>Total cases : {millify(item.totalCases,MillifyOptions)}</h3>
                      </div>
                    </div>
                  )  
                  }
                })
              }
            </div>
            
          </div>
          <div className={style.regionTable} id="region-statistics">
          <h1>REGION WISE STATISTICS</h1>
          <table className={style.styledTable}>
            <thead >
                <th >REGION</th>
                <th >TOTAL CASES</th>
                <th>NEW CASES</th>
                <th>TOTAL DEATHS</th>
                <th>NEW DEATHS</th>
                <th>TOTAL RECOVERIES</th>
                <th>NEW RECOVERIES</th>
            </thead>
            <tbody>
          {regionData.map((region,index)=>{
                {/* console.log(region) */}
                return (
                  <tr>
                     <td>{region.region}</td>
                     <td>{millify(region.totalInfected,MillifyOptions)}</td> 
                     <td>{millify(region.newInfected,MillifyOptions)}</td>
                    <td>{millify(region.deceased,MillifyOptions)}</td>
                     <td>{region.newDeceased}</td>
                     <td>{millify(region.recovered,MillifyOptions)}</td>
                     <td>{millify(region.newRecovered,MillifyOptions)}</td>
                  </tr>
                )
              })}
              </tbody>
              </table>
          </div>
        </main>
  
        <footer>
              Copyright 2021&nbsp;<a href="https://github.com/Manas-Shankar"> Manas Shankar</a>
        </footer>
  
        
  
        <style jsx global>{`
                    html,
                    body {
                      padding: 0;
                      background-color: #18414e;
                      margin: 0;
                      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                        Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                        sans-serif;
                        scroll-behavior: smooth;
                    
                                  }
                                
                                  * {
                                    box-sizing: border-box;
                                  }
                                  footer {
                            width: 100%;
                            height: 100px;
                            border-top: 1px solid #bfbfbf;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                          }

                          main {
                              padding: 5rem 0 2rem 0;
                              flex: 1;
                              position:relative;
                              display: flex;
                              flex-direction: column;
                              justify-content: center;
                              align-items: center;
                            }
                        
                          footer{
                            font-family: 'Roboto Mono', monospace;
                          }
                         
                        
                          footer a {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            text-decoration:underline;
                          }

                          footer a:hover {
                            font-weight:bold;
                            text-decoration:underline;
                          }
                        
                          a {
                            color: inherit;
                            text-decoration: none;
                          }
                        

                            
                            `}</style>
                </div>
      
    )
  }
  else{
    return (<div>
      content loading ...
    </div>)
  }
  
}



