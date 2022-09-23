import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { handleCategoryChange, handleDifficultyChange, handleTypeChange } from '../../redux/actions'
import store from "../../redux/store"

export default function SelectField(props) {
    const {label, options} = props
    const [value, setValue] = useState("")


    const handleChange = (e) => {
        setValue(e.target.value)
        
        switch(label) {

            case "Category":
                store.dispatch(handleCategoryChange(e.target.value))
            break

            case "Difficulty":
                store.dispatch(handleDifficultyChange(e.target.value))
            break

            case "Type":
                store.dispatch(handleTypeChange(e.target.value))
            break
        }

        console.log(store.getState())
    }

    return (
    <div class="mb-3">
        <label  className="form-label">{label}</label>
        <select className="form-select" value={value} onChange={handleChange}>
            {options.map((optionItem, index) => (
                    <option value={optionItem.id} key={optionItem.id}>{optionItem.name }</option>
            ))}
        </select>
    </div>
    )
}
