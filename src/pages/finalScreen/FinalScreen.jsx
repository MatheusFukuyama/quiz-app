import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../../components/header/Header'
import QuestionCard from '../../components/questionCard/QuestionCard'
import { useState, useEffect } from 'react'
import store from '../../redux/store'
import { handleFinalChange } from '../../redux/actions'

export const FinalScreen = () => {
    const {options, questions, correct_answers, choice} = useSelector(state => state)
    const [items, setItems] = useState([options, questions, correct_answers, choice]);

    useEffect(() => {
      localStorage.setItem('items', JSON.stringify(items));
      store.dispatch(handleFinalChange(true))
    }, [items]);

    
    return (
    <div>
      <Header/>
      {
        questions.map((question, index) => (
          <QuestionCard key={index} statement={`${index + 1}. ${question.question}`}
                answers={options[index][0]} correctAnswer={correct_answers[index]} indexQuestion={index}/>
        ))
      }
    </div>
    )
}
