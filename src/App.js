import React from 'react';
import axios from "axios";
import './App.scss';

import Navbar from './Components/Navbar';
import PlantList from './Components/PlantList'
import WateringList from './Components/WateringList'
import Topbar from './Components/Topbar';
import { render } from '@testing-library/react';

function App() {
  return(
    <div>
    <Navbar />
    <PlantList />
    <WateringList />
    </div>
  )
}

export default App;