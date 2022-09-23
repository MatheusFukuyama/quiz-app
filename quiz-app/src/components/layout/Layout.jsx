import React  from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import './Layout.css'
import { useState } from 'react'

export default function Layout({ children }) {
  const { final } = useSelector(state => state)
  const [heightLayout, setHeightLayout] = useState(null)

  useEffect(() => {
    if(final) {
      setHeightLayout('heightPercent100')
    } else {
      setHeightLayout('heightVh100')
    }
  }, [final])

  return (
    <main className={`container d-flex flex-column align-items-center ${heightLayout} 
    justify-content-center p-5`}>
        { children }
    </main>
  )
}
