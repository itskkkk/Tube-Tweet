import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import loader from './assets/loader.gif'
import { getCurrentUser } from './store/slices/authSlice.js'


function App() {
  const dispatch = useDispatch()

  const [loading , setLoading] = useState(true)

  useEffect(() => {
    dispatch(getCurrentUser()).then(() => {
      setLoading(false);
    });
  }, []);

  if(loading)
    return(
      <div className='h-screen w-full overflow-y-auto dark:bg-black bg-white text-gray-500 dark:text-white'>
        <div className='flex flex-col items-center justify-center mt-64'>
            <img src={loader} className='logo w-24' alt=" Loading..." />
            <h1 className='text-3xl text-center mt-8 font-semibold'>
              Loading....
            </h1>
        </div>
      </div>
  );
  

  return (
    <>
      <Outlet />
      <div className='bg-purple-400 relative'></div>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
        transition:Bounce
      />
    </>
  )
}

export default App
