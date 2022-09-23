import React, { useState } from 'react'
import { useEffect } from 'react'
import './QuestionNavigation.css'
import { useSelector } from 'react-redux'
import store from '../../redux/store'
import { handleIndexQuestionChange } from '../../redux/actions'

export default function QuestionNavigation() {
  const { choice, question_index } = useSelector(state => state)
  const indexes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
  const [page, setPage] = useState(null)


  const handleClick = (e) => {
    store.dispatch(handleIndexQuestionChange(e.target.value))
  }

  return (
    <nav>
        <ul className='navigation rounded'>
          {
            indexes.map((name, index) => (
                <li className="page" value={index} key={index} onClick={handleClick}>{name}</li>
            ))
          }
            
        </ul>
    </nav>
  )
}
