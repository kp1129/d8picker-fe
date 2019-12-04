
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import CalPic from "../../assets/images/calendar.jpg"
import Phone from "../../assets/images/phone.png"
import Pencil from "../../assets/images/pencil.png"
import Robot from "../../assets/images/robot.png"
import ReactGA from 'react-ga';
import MarketingNav from "./marketingnav"
import '../../index.css'


function Marketing() {
    ReactGA.pageview(window.location.pathname + window.location.search);

  return (
     <div className='container' style={{background:"black"}}>
         <MarketingNav />
         <div className="marketing-mid" style={{width:"100%", display:"flex", flexDirection:"row", alignItems:"center", marginBottom:"30px"}}>
             <div className="m-text" style={{width:"40%"}}>
                <h1 style={{marginTop:"20%", color:"white", textAlign:"center", fontWeight:"400", fontSize:"3.5em" }}>Schedule all student events and inform students and parents automatically</h1>
                <div style={{textAlign:"center", marginTop:"10%", height:"5%", width:"100%"}}>
                    <Link to='/sign-in' style={{background:"white", color:"#F5945B", border: "2px solid #F5945B", borderRadius:"5px", padding:"15px 150px", fontSize:"1.5em", textDecoration:"none", fontWeight:"500"}}>Sign In</Link>
                </div>
                <div style={{textAlign:"center", marginTop:"10%", height:"5%", width:"100%"}}>
                    <Link to='/register' style={{background: "#F5945B", color:"#21242C", borderRadius:"5px", padding:"15px 150px", textDecoration:"none", fontWeight:"500", fontSize:"1.5em"}}>Sign Up</Link>
                </div>
                
            </div>

            <div style={{marginLeft:"10%",marginTop:"20%", overflow:"hidden"}}>
                <img src={CalPic} style={{width:"60vw", height:"auto"}}/>
            </div>

         
         </div>
         <div className="market-card-cont" style={{background:"white", marginTop:"80px", display:"flex", flexDirection:"row", height:"40rem"}}>
             <div className="market-card">
                 <img src={Phone}/>
                 <h3>Schedule Events Fast</h3>
                 <h3 style={{fontWeight:"500"}}>At Mataka we respect your time. Our design is conduvtive to the fastest way of scheduling events in masse.</h3>
             </div>
             <div className="market-card">
                 <img src={Pencil}/>
                 <h3>Inform Students Automatically</h3>
                 <h3 style={{fontWeight:"500"}}>Mataka will send an automated message of your preference 48 hours before all events. Also, gets pushed to the student's calendar.</h3>
             </div>
             <div className="market-card">
                 <img src={Robot}/>
                 <h3>Automate the Year</h3>
                 <h3 style={{fontWeight:"500"}}>With Mataka you can set up a day or a full academic year of practices and events.</h3>
             </div>
         </div>
         <div className="footer" style={{ height:"4rem", background:"black", color:"white", marginTop:"20vw", width:"100%", textAlign:"center"}}><h3>Created By Lambda Students</h3></div>

         
     </div>
        

  )
}

export default Marketing;
