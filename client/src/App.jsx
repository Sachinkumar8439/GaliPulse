import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";
import SignUp from "./components/SignupPage";

import Dashcos from "./components/CostomerPage/Dashcos";
import Mappage from "./components/MapPage/Mappage";
import helper from './helpers/helper';
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import ItemForm from "./components/ItemForm";

function App() {
  const [userposition, setuserposition] = useState([0, 0]);

  const [users, setusers] = useState(() => {
    const generatedUsers = [];
    for (let i = 1; i <= 50; i++) {
      generatedUsers.push({
        id: i,
        name: `User ${i}`,
        position: [
          51.5 + Math.random() * 0.1,
          -0.1 + Math.random() * 0.1,
        ],
        title: `Product ${String.fromCharCode(65 + (i % 26))}`,
        rate: `${15 + Math.floor(Math.random() * 16)} $/kg`,
      });
    }
    return generatedUsers;
  });

  const [myloc, setmyloc] = useState([0, 0]);

  useEffect(() => {
    console.log('this is my lock', myloc);
  }, [myloc]);

  const getlocation = async () => {
    const location = await helper.getCurrentLocation();
    if (location.success) {
      console.log("location is ", location.location);
      console.log("this is data", await helper.fetchLocationDetails(location.location.latitude, location.location.longitude));
      setuserposition([location.location.latitude, location.location.longitude]);
      // const tracker = await helper.trackUserLocation(5000);
      // console.log("this is start tracking", tracker);
      // tracker.startTracking((data) => {
      //   console.log('data is here ', data.position);
      // });
      // setTimeout(() => {
      //   tracker.stopTracking();
      // }, 10000);
    } else {
      console.log('location not found');
    }
  };

  useEffect(() => {
    getlocation();
  }, []);

  const handleconnect = (selectedUser) => {
    console.log(selectedUser);
  };

  const handleviewmore = (selectedUser) => {
    console.log('more user is this ', selectedUser);
  };

  const location = useLocation();

  const pageVariants = {
    initial: { opacity: 0, x: "-100vw" },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "100vw" },
  };

  const pageTransition = {
    type: "tween",
    duration: 0.20, // Adjust speed
    ease: "easeInOut",
  };

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/Dashboard" element={<Dashcos/>} />
            <Route path="/log-in" element={<LoginPage />} />
            <Route path="/Dashboard/:id" element={<Dashcos />} />
            <Route path="/Additem" element={<ItemForm/>} />
            <Route path="/Addneed" element={<ItemForm/>} />
            <Route path="/nearer" element={<Mappage handleviewmore={handleviewmore} handleconnect={handleconnect} userposition={userposition} users={users}/>} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;