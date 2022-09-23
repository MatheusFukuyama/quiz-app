import React from 'react'
import './Header.css'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import store from '../../redux/store'
import { handleChoiceChange, handleCorrectAnswersChange, handleIndexQuestionChange, handleOptionsChange, handleQuestionsChange, handleFinalChange } from '../../redux/actions'

export default function Header() {
    const { correct_answers, choice } = useSelector(state => state)
    const [score, setScore] = useState(0)
    const navigate = useNavigate()


    useEffect(() => {
        let counter = 0
        for(let i = 0; i < 10; i++) {
            if(choice[i] == correct_answers[i]){
                counter++
            }
        }

        setScore(counter)
    }, [])

    const handleClick = (e) => {
        store.dispatch(handleIndexQuestionChange(0))
        store.dispatch(handleQuestionsChange([]))
        store.dispatch(handleChoiceChange([]))
        store.dispatch(handleOptionsChange([]))
        store.dispatch(handleCorrectAnswersChange([]))
        store.dispatch(handleFinalChange(false))
        navigate('/')
    }

    return (
        <div className='d-flex justify-content-between header'>
            <div className='d-flex flex-column'>
                <span className='score-label'>SCORE:</span>
                <span className='score-value py-1 px-4 rounded-3'>{score}/10</span>
            </div>

            <button className='btn btn-success' onClick={handleClick}>START</button>
        </div>
    )
}
