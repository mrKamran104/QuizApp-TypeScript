import { AnswerObject } from "../App";

export type QuesType = {
    category: string
    correct_answer: string
    difficulty: string
    incorrect_answers: string[]
    question: string
    type: string
}

export type Quiz = QuesType & { options: string[] }

export type QuesPropsType = {
    question: string
    options: string[]
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void
    userAnswer: AnswerObject | undefined
    quesNr: number
    totalQues: number
}