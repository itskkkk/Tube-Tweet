import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { RouterProvider,Route,createBrowserRouter,createRoutesFromElements } from 'react-router-dom'; 
import store from "./store/store.js";
import Home from './components/index.js';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route  path='/' element = {<App />}>
      <Route path='' element = {<Home />}></Route>
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <RouterProvider router={router} />
  </Provider>
)
