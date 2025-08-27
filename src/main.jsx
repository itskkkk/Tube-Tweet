import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { RouterProvider,Route,createBrowserRouter,createRoutesFromElements } from 'react-router-dom'; 
import store from "./store/store.js";
import {
  Home,
  Login,
  SignUp,
  Feed,
  AuthLayout,
  GuestTweets,
  GuestAdmin,
  GuestHistory,
  ChannelVideos,
  ChannelPlaylist,
  ChannelTweets,
  ChannelSubScribed,
  AboutChannel,
  GuestMyChannel,
  PlaylistVideos,
  GuestSubscribers,
  GuestLikedVideos,
  PageNotFound,
} from './components/index.js';

import FeedTweets from './pages/FeedTweets.jsx';
import FeedVideos from './pages/FeedVideos.jsx';
import Dashboard from  './pages/Dashboard.jsx';
import History from './pages/History.jsx';
import SearchResult from './pages/SearchResult.jsx';
import VideoDetail from './pages/VideoDetail.jsx';
import Channel from './pages/Channel.jsx';
import LikedVideos from './pages/LikedVideos.jsx';
import Settings from './pages/Settings.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route  path='/' element = {<App />}>
      <Route path='' element = {<Home />}>
        <Route path='' element = {<Feed />}>
          {/* Home page feed videos */}
          <Route path='' element={<FeedVideos />} />
          
          {/* Home page feed tweets */}
          <Route 
            path='tweets'
            element={
              <AuthLayout authentication guestComponent={<GuestTweets />}>
                <FeedTweets />
              </AuthLayout>
            }
          />

          {/* playlists */}
          <Route path="playlist/:playlistId" element={<PlaylistVideos />} />

          {/* All Other channels */}
          <Route path='user/:username' element={<Channel />}>
            <Route path='' element={<ChannelVideos owner={false} />} />
            <Route path='playlists' element={<ChannelPlaylist owner={false} />} />
            <Route path='tweets' element={<ChannelTweets />} owner={false} />
            <Route path='subscribed' element={<ChannelSubScribed owner={false} />} />
            <Route path='about' element={<AboutChannel owner={false} />} />
          </Route>

          {/* owning my channel(currently loggd in user) */}
          <Route
            path='channel/:username'
            element={
              <AuthLayout authentication guestComponent={<GuestMyChannel />}>
                <Channel owner />
              </AuthLayout>
            }
          >
            <Route path='' element={<ChannelVideos owner />} />
            <Route path='tweets' element={<ChannelTweets owner />} />
            <Route path='playlists' element={<ChannelPlaylist owner />} />
            <Route path='subscribed' element={<ChannelSubScribed owner />} />
            <Route path='about' element={<AboutChannel owner />} />
          </Route>

          {/* Search Results */}
          <Route path='/results' element={<SearchResult />} />

          <Route 
            path='feed/history'
            element={
              <AuthLayout authentication guestComponent={<GuestHistory />}>
                <History />
              </AuthLayout>
            }
          />

          {/* liked videos */}
          <Route 
            path='feed/liked'
            element={
              <AuthLayout authentication guestComponent={<GuestLikedVideos />}>
                <LikedVideos />
              </AuthLayout>
            }
          />

          {/* Subscribers */}
          <Route  
            path='feed/subscribers'
            element={
              <AuthLayout authentication guestComponent={<GuestSubscribers />}>
                <ChannelSubScribed owner isSubscribers />
              </AuthLayout>
            }
          />

          {/* Settings */}
          <Route 
            path='settings'
            element={
              <AuthLayout authentication>
                <Settings />
              </AuthLayout>
            }
          />

        </Route>

        {/* Video Watching */}
        <Route path='/watch/:videoId' element={<VideoDetail />} />

        {/* Admin Dashboard */}
        <Route
          path='/admin/dashboard'
          element={
            <AuthLayout authentication guestComponent={<GuestAdmin />}>
              <Dashboard />
            </AuthLayout>
          }
        />
      </Route>

      {/* Login */}
      <Route 
        path='/login'
        element={
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        }
      />

      {/* Sign up  */}
      <Route 
        path='/signup'
        element={
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        }
      />
      
      {/* 404 */}
      <Route path='*' element={<PageNotFound />} />
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <RouterProvider router={router} />
  </Provider>
);