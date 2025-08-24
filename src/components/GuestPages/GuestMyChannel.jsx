import React from 'react'
import { icons } from '../../assets/icons'
import GuestComponent from './GuestComponent';

function GuestMyChannel() {
  return (
    <GuestComponent 
      title="Create Your Own Channel"
      subtitle="Share your voice with the world. Sign in to get started"
      icon={<span className='w-full h-full flex items-center p-2'>{icons.MyContent}</span>}
      route="/"
    />
  );
}

export default GuestMyChannel