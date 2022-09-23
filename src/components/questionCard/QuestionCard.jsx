import React, { useEffect } from 'react'
import { useState } from 'react'
import { handleChoiceChange } from '../../redux/actions'
import store from '../../redux/store'
import './QuestionCard.css'
import { useSelector } from 'react-redux'
import parse from 'html-react-parser';

export default function QuestionCard(props) {
    const { statement, answers, correctAnswer, indexQuestion } = props
    const [choices, setChoices] = useState([])
    const [checkedRadio, setCheckedRadio] = useState(false)
    const { question_index, choice } = useSelector(state => state)

    const handleChange = (e) =>{
        let array = choices
        array[question_index] = e.target.value
        setChoices([...array])
        store.dispatch(handleChoiceChange(choices))
        setCheckedRadio(e.target.value)
    }
    
    if(correctAnswer || correctAnswer === 0){
        return (       
            <div className='question-card mt-5'>
                <h1 className='bg-dark text-light w-100 rounded-3 statement'>{parse(statement)}</h1>           
                <ul className='list'>
                    {
                        answers.map((answer, index) => {
                            if(index == choice[indexQuestion]) {
                                if(index === correctAnswer){
                                    return (<li className='mt-2 rounded-3 answer bg-success' key={index}>
                                        <input type="radio" value={index} checked name={indexQuestion} onChange={handleChange}/>{parse(answer)}
                                    </li>)
                                } else {
                                    return (<li className='mt-2 rounded-3 answer' key={index}>
                                        <input type="radio" value={index}  checked name={indexQuestion} onChange={handleChange}/>{parse(answer)}
                                    </li>)
                                }

                            } else {
                                if(index === correctAnswer){
                                    return (<li className='mt-2 rounded-3 answer bg-success' key={index}>
                                        <input type="radio" value={index} name={indexQuestion} onChange={handleChange}/>{parse(answer)}
                                    </li>)
                                } else {
                                    return (<li className='mt-2 rounded-3 answer' key={index} >
                                        <input type="radio" value={index} name={indexQuestion} onChange={handleChange}/>{parse(answer)}
                                    </li>)
                                }
                            }

                        })
                    }
                </ul>
            </div>
        )

    } else {
        if(choice[question_index]){
            return (
                <div className='question-card'>
                    <h1 className='bg-dark text-light w-100 rounded-3 statement'>{parse(statement)}</h1>      
                    <ul className='list'>
                        {
                            answers.map((answer, index) => (
                                <li className='mt-2 rounded-3 answer' key={index}>
                                    <input type="radio" value={index}  checked={index == choice[question_index]} onChange={handleChange} name={question_index}/>{parse(answer)}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            )
        } else {
            return (
                <div className='question-card'>
                    <h1  className='bg-dark text-light w-100 rounded-3 statement'>{parse(statement)}</h1>    
                    <ul className='list'>
                        {
                            answers.map((answer, index) => (
                                <li className='mt-2 rounded-3 answer' key={index}>
                                    <input type="radio" value={index}  onChange={handleChange} name={question_index}/>{parse(answer)}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            )
        }

    }
}
