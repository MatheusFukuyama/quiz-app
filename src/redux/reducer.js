import { CHANGE_CATEGORY, CHANGE_DIFFICULTY, CHANGE_TYPE, CHANGE_CHOICE, CHANGE_QUESTIONINDEX, CHANGE_FINAL, CHANGE_CORRECT_ANSWERS, CHANGE_OPTIONS, CHANGE_QUESTIONS } from "./actionsType"

const initialState = {
    question_category: 9,
    question_difficulty: "easy",
    question_type: "multiple",
    choice: [],
    question_index: 0,
    final: false,
    correct_answers: [],
    options: [],
    questions: [],
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case CHANGE_CATEGORY:
            return {
                ...state,
                question_category: action.payload
            }
        case CHANGE_DIFFICULTY:
            return {
               ...state,
                question_difficulty: action.payload
            }
        case CHANGE_TYPE:
            return {
                ...state,
                question_type: action.payload
            }
        case CHANGE_CHOICE:
            return {
                ...state,
                choice: action.payload
            }
        case CHANGE_QUESTIONINDEX:
            return {
                ...state,
                question_index: action.payload
            }
        case CHANGE_FINAL:
            return {
                ...state,
                final: action.payload
            }
        case CHANGE_OPTIONS:
            return {
                ...state,
                options: action.payload
            }
        case CHANGE_QUESTIONS:
            return {
                ...state,
                questions: action.payload
            }
        case CHANGE_CORRECT_ANSWERS:
            return {
                ...state,
                correct_answers: action.payload
            }
        default:
            return state
    }
}

export default reducer