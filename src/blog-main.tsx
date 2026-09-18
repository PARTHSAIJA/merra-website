import React from 'react'
import ReactDOM from 'react-dom/client'
import BlogApp from './blog/BlogApp'
import './cms/blocks.css'
import './blog/blog.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BlogApp />
  </React.StrictMode>,
)
