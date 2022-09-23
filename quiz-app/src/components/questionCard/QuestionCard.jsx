import React from 'react'
import { useState } from 'react'
import { handleChoiceChange } from '../../redux/actions'
import store from '../../redux/store'
import './QuestionCard.css'
import { useSelector } from 'react-redux'

export default function QuestionCard(props) {
    const { statement, answers, correctAnswer, indexQuestion} = props
    const [choices, setChoices] = useState([])
    const { question_index, choice } = useSelector(state => state)

    const handleChange = (e) =>{
        let array = choices
        array[question_index] = e.target.value
        setChoices([...array])
        store.dispatch(handleChoiceChange(choices))
    }



    if(correctAnswer || correctAnswer == 0){
        return (       
            <div className='question-card mt-5'>
                <h1 className='bg-dark text-light w-100 rounded-3 statement'>{statement}</h1>            
                <ul className='list'>
                    {
                        answers.map((answer, index) => {
                            if(index == choice[indexQuestion]) {
                                if(index == correctAnswer){
                                    return (<li className='mt-2 rounded-3 answer bg-success' key={index} onChange={handleChange}>
                                        <input type="radio" value={index} readOnly checked name={indexQuestion}/>{answer}
                                    </li>)
                                } else {
                                    return (<li className='mt-2 rounded-3 answer' key={index} onChange={handleChange}>
                                        <input type="radio" value={index} readOnly checked name={indexQuestion}/>{answer}
                                    </li>)
                                }

                            } else {
                                if(index == correctAnswer){
                                    return (<li className='mt-2 rounded-3 answer bg-success' key={index} onChange={handleChange}>
                                        <input type="radio" value={index} name={indexQuestion}/>{answer}
                                    </li>)
                                } else {
                                    return (<li className='mt-2 rounded-3 answer' key={index} onChange={handleChange}>
                                        <input type="radio" value={index} name={indexQuestion}/>{answer}
                                    </li>)
                                }
                            }

                        })
                    }
                </ul>
            </div>
        )

    } else {
        return (
            
            <div className='question-card'>
                <h1 className='bg-dark text-light w-100 rounded-3 statement'>{statement}</h1>            
                <ul className='list'>
                    {
                        answers.map((answer, index) => (
                            <li className='mt-2 rounded-3 answer' key={index} onChange={handleChange}>
                               <input type="radio" value={index} name={question_index}/>{answer}
                            </li>
                        ))
                    }
                </ul>
            </div>
        )

    }
}
