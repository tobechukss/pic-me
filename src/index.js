import React from 'react';
import ReactDOM from 'react-dom/client';
import Categories from './components/Categories';
import Nature from './components/Nature';
import Nollywood from './components/Nollywood';
import Illustration from './components/Illustration';
import NightLife from './components/Excite';
import Activity from './components/Excercise';
import Beauty from './components/Beauty';
import Meme from './components/Meme';
import Dance from './components/Dance';
import Login from './components/Login';
import './index.css';

import App from './App';
import Dashboard from './components/Dashboard';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';



const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/categories" element={<Categories/> }/>
      <Route path="/categories/beauty-shots" element={<Beauty />} />
      <Route path="/categories/memes" element={<Meme />} />
      <Route path="/categories/activities" element={<Activity />} />
      <Route path="/categories/dance" element={<Dance/>} />
      <Route path="/categories/night-life" element={<NightLife />} />
      <Route path="/categories/nature-naija" element={<Nature />} />
      <Route path="/categories/nollywood" element={<Nollywood />} />
      <Route path="/categories/illustrations" element={<Illustration/>} />
      
     
      
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
