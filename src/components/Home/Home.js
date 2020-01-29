import React from 'react';
import Sidebar from './Sidebar'
import Blank from './Blank'

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
      <h1>Home</h1>
      <Sidebar />
      <Blank/>
      <iframe src="https://calendar.google.com/calendar/embed?src=danstad2012%40gmail.com&ctz=America%2FLos_Angeles" style={style}></iframe>
    </div>
  )
}

export default Home;