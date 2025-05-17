import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// import Sellersignin from "./components/Landing";
import Dashcos from "./components/CostomerPage/Dashcos";
import Mappage from "./components/MapPage/Mappage";
import helper from './helpers/helper'
import LandingPage from "./components/LandingPage";

// import { io } from "socket.io-client";
// const socket = io("http://localhost:5000");

function App() {
  const [userposition,setuserposition] = useState([0,0]);
  
  const [users,setusers] = useState(() => {
    const generatedUsers = [];
    
    for (let i = 1; i <= 50; i++) {
      console.log('ff')
      generatedUsers.push({
      id: i,
      name: `User ${i}`,
      position: [
        51.5 + Math.random() * 0.1,  
        -0.1 + Math.random() * 0.1 
      ],
      title: `Product ${String.fromCharCode(65 + (i % 26))}`, 
      rate: `${15 + Math.floor(Math.random() * 16)} $/kg` 
    });
  }

  return generatedUsers;
});
const [myloc,setmyloc] = useState([0,0])

useEffect(()=>{
    console.log('this is my lock',myloc);
},[myloc])

const getlocation = async()=>{
  const location = await helper.getCurrentLocation();
  if(location.success)
  {
    console.log("location is ",location.location)
    console.log("this is data",await helper.fetchLocationDetails(location.location.lat,location.location.lng))
    setuserposition([location.location.lat,location.location.lng]);
    const tracker = await helper.trackUserLocation(5000);
    console.log("this is start tracking",tracker)
     tracker.startTracking((data)=>{
          console.log('data is here ',data.position);
     });
     setTimeout(() => {
      tracker.stopTracking();
      
     }, 10000);

  }
  else console.log('location not found')
}

useEffect(()=>{
  getlocation()
  
},[])
//  const [users] = useState([
  //     { id: 1, name: 'Alice', position: [51.505, -0.09], title: 'Product A', rate: '20 $/kg' },
  //     { id: 2, name: 'Bob', position: [51.51, -0.1], title: 'Product B', rate: '25 $/kg' },
  //     { id: 3, name: 'Charlie', position: [51.52, -0.08], title: 'Product C', rate: '30 $/kg' },
  //     { id: 4, name: 'Daisy', position: [51.53, -0.07], title: 'Product D', rate: '15 $/kg' },
  //     { id: 5, name: 'Eve', position: [51.54, -0.11], title: 'Product E', rate: '22 $/kg' },
  //   ]);
  
  // useEffect(() => {
  //   console.log("Socket connected");

  //   return () => {
    //     socket.disconnect();
  //   };
  // }, []);

  const handleconnect = (selectedUser)=>{
        console.log(selectedUser);
  }
  const handleviewmore = (selectedUser)=>{
    console.log('more user is this ',selectedUser);
  }

  return (
    <div className="App">
      <Routes>
       
        {/* <Route path="/" element={<Mappage handleconnect={handleconnect} userposition={userposition} users={users} handleviewmore={handleviewmore}/>} /> */}
        <Route path="/" element={<LandingPage/>} />
         <Route path= "/Dashboard/:id" element={<Dashcos/>}/>
     
      </Routes>
    </div>
  );
}

export default App;
