import React  from 'react'
import './Layout.css'

export default function Layout({ children }) {
  return (
    <main className='container d-flex flex-column align-items-center h100
    justify-content-center p-5'>
        { children }
    </main>
  )
}
