import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import useAxios from '../../hooks/useAxios'
import QuestionCard from '../../components/questionCard/QuestionCard'
import QuestionNavigation from '../../components/navigation/QuestionNavigation'
import './Question.css'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import store from '../../redux/store'
import { handleCorrectAnswersChange, handleIndexQuestionChange, handleOptionsChange, 
  handleQuestionsChange, handleChoiceChange} from '../../redux/actions'

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
  const [alternatives, setAlternatives] = useState(0)
  const [next, setNext] = useState(false)
  const [mensage, setMensage] = useState("")
  const navigate = useNavigate()


  useEffect(() => {
    if(response?.results.length) {
      if(alternatives < 10) {
        let question = response.results[alternatives]
        let answers = [...question.incorrect_answers]
        answers.splice(
          getRandomInt(question.incorrect_answers.length + 1),
          0,
          question.correct_answer
        );
        store.dispatch(handleOptionsChange([...options, [answers]]))
        store.dispatch(handleQuestionsChange(response.results))
        setAlternatives(alternatives + 1)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alternatives, response])

  if(loading) 
      return (
        <p>Loading...</p>
      )

  const handleNextClick = () => {
    if(question_index < 9){
      store.dispatch(handleIndexQuestionChange(question_index + 1))
      setNext(true)
    }
  }

  const handleBackClick = () => {
    if(question_index > 0){
      store.dispatch(handleIndexQuestionChange(question_index - 1))
      setNext(false)
    }
  }

  const handleSubmitClick = () => {
      let submit = true
      for(let i = 0; i < 10; i++) {
        if(!choice[i]) {
          submit = false
        }
      }

      if(submit) {
        navigate('/score')
      } else {   
        setMensage("Answer all questions before submit")
      }
  }

  const handleCancelClick = () => {
      store.dispatch(handleIndexQuestionChange(0))
      store.dispatch(handleQuestionsChange([]))
      store.dispatch(handleChoiceChange([]))
      store.dispatch(handleOptionsChange([]))
      store.dispatch(handleCorrectAnswersChange([]))
      navigate('/')
  }


  const getRandomInt = (max) => {
    let correctIndex = Math.floor(Math.random() * Math.floor(max))
    store.dispatch(handleCorrectAnswersChange([...correct_answers, correctIndex]))
    return correctIndex
  }


  if(questions.length)
    return (
      <div className='d-flex flex-column'>
        <div className='d-flex l-gap'>
            <QuestionCard statement={`${question_index + 1}. ${questions[question_index].question}`}
            answers={options[question_index][0]} indexQuestion={question_index} next={next}/>
          <QuestionNavigation />
        </div>
        <div className='d-flex justify-content-between default-size mt-2'>
              <button  className='btn btn-warning' onClick={handleBackClick}> Back</button>
              <button  className='btn btn-success' onClick={handleNextClick}> Next</button>
        </div>

        <button className='btn btn-primary default-size mt-3' onClick={handleSubmitClick}>Submit</button>
        <button className='btn btn-danger default-size mt-1'  onClick={handleCancelClick}>Cancel</button>
        <p className='text-danger msg default-size text-center'>{mensage}</p>
      </div>
    )
}
