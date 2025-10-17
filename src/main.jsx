import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Address from './pages/Address.jsx'
import Checkout from './pages/Checkout.jsx'
import Orders from './pages/Orders.jsx'
import UserProfile from './pages/UserProfile.jsx'
import Products from './pages/Products.jsx'
import Cart from './pages/Cart.jsx'
import ProductsDetails from './pages/ProductsDetails.jsx'
import Wishlist from './pages/Wishlist.jsx'
import NextStepProvider from './context/NextStepProvider.jsx'

const router = createBrowserRouter([
  {
    element:<App/>,
    path:"/"
  },
  {
    element:<Products/>,
    path:"/products/:category"
  },
  {
    element:<ProductsDetails/>,
    path:"/product/:id"
  },
  {
    element:<Cart/>,  
    path:"/cart"
  },
  {
    element:<UserProfile/>, 
    path:"/userprofile"
  },
  {
    element:<Wishlist/>,
    path:"/wishlist"
  },
  {
    element:<Orders/>,
    path:"/orders"
  },
  {
    element:<Checkout/>,
    path:"/checkout"
  },
  {
    element:<Address/>,
    path:"/address"
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>

    <NextStepProvider>
        <RouterProvider router={router}/>
    </NextStepProvider>
     
      
    
   
    
  </StrictMode>,
)
