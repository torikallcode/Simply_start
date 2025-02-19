import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/home'
import { DetailTask } from './pages/DetailTask'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  }, {
    path: 'detail/:id',
    element: <DetailTask />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
