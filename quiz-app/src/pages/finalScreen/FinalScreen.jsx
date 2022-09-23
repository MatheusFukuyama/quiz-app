import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../../components/header/Header'
import QuestionCard from '../../components/questionCard/QuestionCard'
import { useState, useEffect } from 'react'

export const FinalScreen = () => {
    const {options, questions, correct_answers, choice} = useSelector(state => state)
    const [items, setItems] = useState([options, questions, correct_answers, choice]);

    useEffect(() => {
      localStorage.setItem('items', JSON.stringify(items));
    }, [items]);
    

    return (
    <div>
      <Header/>
      
      {
        questions.map((question, index) => (
          <QuestionCard key={index} statement={`${index + 1}. ${question.question}`}
                answers={options[index + 1][0]} correctAnswer={correct_answers[index + 1]} indexQuestion={index}/>
        ))
      }
    </div>
    )
}
