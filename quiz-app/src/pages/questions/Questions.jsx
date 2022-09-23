import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import useAxios from '../../hooks/useAxios'
import QuestionCard from '../../components/questionCard/QuestionCard'
import QuestionNavigation from '../../components/navigation/QuestionNavigation'
import './Question.css'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import store from '../../redux/store'
import { handleCorrectAnswersChange, handleIndexQuestionChange, handleOptionsChange, handleQuestionsChange } from '../../redux/actions'

export const Questions = () => {
  const {
    question_category,
    question_difficulty,
    question_type,
    choice,
    question_index,
    correct_answers,
    questions,
    options
  } = useSelector(state => state)

  let apiUrl = `/api.php?amount=10&category=${question_category}&difficulty=${question_difficulty}&type=${question_type}`

  const { response, loading } = useAxios({ url: apiUrl})
  const [finished, setFinished] = useState()
  const [alternatives, setAlternatives] = useState([])
  const [indexQuestion, setIndexQuestion] = useState([])
  const navigate = useNavigate()


  useEffect(() => {
    if(response?.results.length) {
      const question = response.results[question_index];
      let answers = [...question.incorrect_answers]
      answers.splice(
        getRandomInt(question.incorrect_answers.length + 1),
        0,
        question.correct_answer
      );
      setAlternatives(answers)
      store.dispatch(handleOptionsChange([...options, [answers]]))
      store.dispatch(handleQuestionsChange(response.results))
    }
  }, [question_index, response])

  if(loading) 
      return (
        <p>Loading...</p>
      )

  const handleNextClick = () => {
    if(question_index < 9)
      store.dispatch(handleIndexQuestionChange(question_index + 1))
  }

  const handleBackClick = () => {
    if(question_index > 0)
      store.dispatch(handleIndexQuestionChange(question_index - 1))
  }

  const handleFinishClick = () => {
      setFinished(true)
      for(let i = 0; i < 10; i++) {
        console.log(choice[i])
        if(!choice[i]) {
          setFinished(false)
        }
      }

      if(finished) {
        navigate('/score')
      } 
  }

  const handleCancelClick = () => {
      navigate('/')
  }


  const getRandomInt = (max) => {
    let correctIndex = Math.floor(Math.random() * Math.floor(max))
    store.dispatch(handleCorrectAnswersChange([...correct_answers, correctIndex]))
    return correctIndex
  }


  if(response && options)
    return (
      <div className='d-flex flex-column'>
        <div className='d-flex l-gap'>
            <QuestionCard statement={`${question_index + 1}. ${response.results[question_index].question}`}
            answers={alternatives} indexQuestion={indexQuestion}/>
          <QuestionNavigation />
        </div>
        <div className='d-flex justify-content-between btn-size mt-2'>
              <button  className='btn btn-warning' onClick={handleBackClick}> Back</button>
              <button  className='btn btn-success' onClick={handleNextClick}> Next</button>
        </div>

        <button className='btn btn-primary btn-size mt-3' onClick={handleFinishClick}>Finish</button>
        <button className='btn btn-danger btn-size mt-1'  onClick={handleCancelClick}>Cancel</button>

      </div>
    )
}
