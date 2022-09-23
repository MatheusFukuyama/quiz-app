import {
    CHANGE_CATEGORY,
    CHANGE_DIFFICULTY,
    CHANGE_TYPE,
    CHANGE_CHOICE,
    CHANGE_QUESTIONINDEX,
    CHANGE_CORRECT_ANSWERS,
    CHANGE_OPTIONS,
    CHANGE_QUESTIONS,
    CHANGE_FINAL
} from './actionsType'

export const handleCategoryChange = (payload) => ({
    type: CHANGE_CATEGORY,
    payload
})

export const handleDifficultyChange = (payload) => ({
    type: CHANGE_DIFFICULTY,
    payload
})

export const handleTypeChange = (payload) => ({
    type: CHANGE_TYPE,
    payload
}
)
export const handleChoiceChange = (payload) => ({
    type: CHANGE_CHOICE,
    payload
}
)
export const handleIndexQuestionChange = (payload) => ({
    type: CHANGE_QUESTIONINDEX,
    payload
})

export const handleFinalChange = (payload) => ({
    type: CHANGE_FINAL,
    payload
})

export const handleOptionsChange = (payload) => ({
    type: CHANGE_OPTIONS,
    payload
})

export const handleQuestionsChange = (payload) => ({
    type: CHANGE_QUESTIONS,
    payload
})

export const handleCorrectAnswersChange = (payload) => ({
    type: CHANGE_CORRECT_ANSWERS,
    payload
})
