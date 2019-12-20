import React from "react"
import { Link } from "react-router-dom"
import CalPic from "../../assets/images/calendar.jpg"
// import Phone from "../../assets/images/phone.png"
// import Pencil from "../../assets/images/pencil.png"
// import Robot from "../../assets/images/robot.png"

// import robo from "../../assets/images/robo.svg"
// import pencil from "../../assets/images/pencil.svg"
// import cellphone from "../../assets/images/cellphone.svg"

import SmartphoneIcon from "@material-ui/icons/Smartphone"
import CreateIcon from "@material-ui/icons/Create"
import BuildIcon from "@material-ui/icons/Build"

import ReactGA from "react-ga"
import MarketingNav from "./marketingnav"
import "../../index.css"

function Marketing() {
  ReactGA.pageview(window.location.pathname + window.location.search)

  return (
    <div>
      <div className="container" style={{ background: "black" }}>
        <MarketingNav />
        <div
          className="marketing-mid"
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "30px"
          }}>
          <div className="m-text" style={{ width: "40%" }}>
            <h1 className="marketing-header">
              Schedule all student events and inform students and parents
              automatically
            </h1>
            <div className="button-div">
              <Link to="/sign-in" className="button-style1">
                Sign In
              </Link>
            </div>
            <div className="button-div">
              <Link to="/register" className="button-style">
                Sign Up
              </Link>
            </div>
          </div>

          <div
            style={{ marginLeft: "10%", marginTop: "20%", overflow: "hidden" }}>
            <img src={CalPic} className="marketing-img" alt="cal-pic" />
          </div>
        </div>
        <div
          className="market-card-cont"
          style={{
            background: "white",
            marginTop: "80px",
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            height: "40rem"
          }}>
          <div className="market-card" style={{ marginLeft: "10px" }}>
            <SmartphoneIcon
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                border: "2px solid black",
                padding: "40px"
              }}
            />
            <h2>Schedule Events Fast</h2>
            <p style={{ fontWeight: "500" }}>
              At Mataka we respect your time. Our design is conductive to the
              fastest way of scheduling events in masse.
            </p>
          </div>
          <div className="market-card">
            <CreateIcon
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                border: "2px solid black",
                padding: "40px"
              }}
            />
            <h2>Inform Students Automatically</h2>
            <p style={{ fontWeight: "500" }}>
              Mataka will send an automated message of your preference 48 hours
              before all events. Also, gets pushed to the student's calendar.
            </p>
          </div>
          <div className="market-card" style={{ marginRight: "20px" }}>
            <BuildIcon
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                border: "2px solid black",
                padding: "40px"
              }}
            />
            <h2> Automate the Year </h2>
            <p style={{ fontWeight: "500" }}>
              With Mataka you can set up a day or a full academic year of
              practices and events.
            </p>
          </div>
        </div>
        <div className="footer-marketing">
          <h3>Created By Lambda Students</h3>
        </div>
      </div>
    </div>
  )
}

export default Marketing
