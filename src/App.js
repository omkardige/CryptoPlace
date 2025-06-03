import { Suspense } from 'react';
import Navbar from './Components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import './index.css';

const App = () => {

  return (
    <div className='app'>
      <Navbar />
      <Suspense fallback={<div className='spinner'>
        <div className='spin'>

        </div>
      </div>}>
        <Outlet />
      </Suspense>

    </div>
  )
}

export default App