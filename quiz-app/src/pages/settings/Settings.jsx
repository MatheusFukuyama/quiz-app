import React from 'react'
import './Settings.css'
import Title from '../../components/title/Title'
import SelectField from '../../components/selectField/SelectField'
import useAxios from '../../hooks/useAxios'
import { useNavigate } from "react-router-dom";
import store from '../../redux/store'
import { handleChoiceChange, handleCorrectAnswersChange, handleIndexQuestionChange, handleOptionsChange, handleQuestionsChange } from '../../redux/actions'

export const Settings = () => {

  const {response, error, loading} = useAxios({ url: "/api_category.php"})
  const navigate = useNavigate()

  
  if(loading) {
    return (
      <div className='mt-5'> 
          <p>Loading...</p>
      </div>
    )
  }

  if(error) {
    return (
      <div className='mt-5'> 
          <p>Some went wrong</p>
      </div>
    )
  }


  const difficultyOptions = [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" }
  
  ]
  const typeOptions = [
    { id: "multiple", name: "Multiple Choise" },
    { id: "boolean", name: "True/False" },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/questions')
  }

  const handleReportClick = (e) => {
    const item = JSON.parse(localStorage.getItem('items'));
    if(item[0].length != 0) {
      store.dispatch(handleOptionsChange(item[0]))
      store.dispatch(handleQuestionsChange(item[1]))
      store.dispatch(handleCorrectAnswersChange(item[2]))
      store.dispatch(handleChoiceChange(item[3]))
      
      navigate('/score')
    }
  }

  if(response)
    return (
      <div className=' w-400 d-flex flex-column align-items-center position-relative'>
          <Title />
          <form className='w-100' onSubmit={handleSubmit}>
            <div className=' border rounded-3 border-dark w-100 p-4'>
              <SelectField options={response.trivia_categories} label='Category'/>
              <SelectField options={difficultyOptions} label='Difficulty' />
              <SelectField options={typeOptions} label='Type' />
            </div>
            <button type="submit" className='button btn-start p-2 w-100  mt-4'>GET STARTED</button>
          </form>

          <button type="button" className='button btn-report p-2 w-100  mt-1' onClick={handleReportClick}>REPORT</button>

      </div>
    )
}
