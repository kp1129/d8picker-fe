import React from 'react';
import Sidebar from './Sidebar'
import GoogleFormConnect from './GoogleFormConnect'
import NavBar from "./Navbar";
import AddEventForm from './AddEventForm'

const Home = () => {

  const style = {
    border: 0,
    width:"900px",
    height:"75vh",
    frameborder:"0",
    scrolling:"no"
  }

  return (
    <div>
      <NavBar />
      <Sidebar />
      <GoogleFormConnect/>
      {/* <AddEventForm /> */} 
      <iframe src="https://calendar.google.com/calendar/embed?src=funnyusernamego%40gmail.com&ctz=America%2FLos_Angeles" style={style}></iframe>
    </div>
  );
};

export default Home;
