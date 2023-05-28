import './App.css';
import { useState, useContext } from 'react';
import { Routes, Route } from "react-router-dom";

import Home from './pages/home/Home';
import Navbar from './Components/navbar/Navbar';
import Rescue from './pages/rescue/Rescue';
import PetInformation from './pages/petInformation/PetInformation';
import Login from './pages/authentication/Login';
import Signup from './pages/authentication/Signup';
import Shelters from './pages/shelters/Shelters';
import Adopt from './pages/adopt/Adopt';
import Popup from './Components/custom/Popup';
import Shelter from './pages/shelterPages/Shelter';

import PetifyState from './context/petifyContextApi/petifyState';
import AdPost from './pages/adPost/AdPost';
import Admin from './pages/adminPanelPages/Admin';

function App() {

  return (
    <>
      <PetifyState>
        <Popup />
        {
          window.location.pathname.startsWith('/admin')
            || window.location.pathname.startsWith('/shelter')
            ? null
            :
            <Navbar />
        }
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/adopt" element={<Adopt />} />
          <Route path="/rescue" element={<Rescue />} />
          <Route path="/shelters" element={<Shelters />} />
          <Route path="/postAd" element={<AdPost />} />
          <Route path="/pet-detail/:id" element={<PetInformation />} />
          <Route path="/shelter/*" element={<Shelter />} />

          <Route path="/admin/*" element={<Admin />} />



        </Routes>


      </PetifyState>

    </>
  );
}

export default App;
