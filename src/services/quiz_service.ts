import { QuesType, Quiz } from "../Types/quiz_types"

const shuffleArray = (array: any[]) => {
    [...array].sort(() => Math.random() - 0.5)
}

export enum Difficulty {
    Easy = "easy",
    Medium = "medium",
    Hard = "hard"
}

export const fetchQuizQues = async (amount: number, difficulty: Difficulty): Promise<Quiz[]> => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
    const { results } = await (await fetch(endpoint)).json()
    const quiz: Quiz[] = results.map((rslt: QuesType) => {
        return {
            ...rslt,
            options: [...rslt.incorrect_answers, rslt.correct_answer]
        }
    })
    return quiz
}