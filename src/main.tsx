import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app.tsx'
import './index.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import { Header } from './components/header/header.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AddPhotosPost } from './pages/add-photos-post/add-photos-post.tsx'
// import { PagePost } from './pages/posts/page-post.tsx'
import { PostId } from './pages/post-id/index.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/:id',
    element: <PostId />,
  },
  {
    path: '/add-post',
    element: <AddPhotosPost />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Header />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
