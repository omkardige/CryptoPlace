import Navbar from './Components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

const App = () => {

  return (
    <div className='app'>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default App