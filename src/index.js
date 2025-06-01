
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home/Home';
import Coin from './Pages/Coin/Coin';
import CoinContextProvider from './Context/CoinContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
const appRoute = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/coin/:Id',
        element: <Coin />
      },
      {
        path:'/',
        element:<Home/>,
      }

    ]
  },




])
root.render(
  <CoinContextProvider>
  <RouterProvider router={appRoute}>
    
  </RouterProvider>
  </CoinContextProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
