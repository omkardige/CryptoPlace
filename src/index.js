import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CoinContextProvider from './Context/CoinContext';
import './index.css';
import App from './App';
import { lazy } from 'react';
import reportWebVitals from './reportWebVitals';
const Home = lazy(()=>import('./Pages/Home/Home'));
const Coin = lazy(()=>import('./Pages/Coin/Coin'));




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
        path: '/',
        element: <Home />
      }

    ]
  },
])
root.render(
  <CoinContextProvider>
      <RouterProvider router={appRoute}>
        <App />
      </RouterProvider>
  </CoinContextProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
