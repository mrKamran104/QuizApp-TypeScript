import React, { useState } from 'react';
import QuesCard from './components/QuesCard';
import { Difficulty, fetchQuizQues } from './services/quiz_service';
import { Quiz } from './Types/quiz_types';

const Total_Ques = 10

export type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

function App() {

  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<Quiz[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  const startQuiz = async () => {
    setLoading(true)
    setGameOver(false)

    const fetchQues = await fetchQuizQues(Total_Ques, Difficulty.Easy)
    setQuestions(fetchQues)
    setScore(0)
    setUserAnswer([])
    setNumber(0)
    setLoading(false)
    console.log(fetchQues)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value
      const correct = questions[number].correct_answer === answer
      if (correct) setScore((prev) => prev + 1)

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }

      setUserAnswer((prev) => [...prev, answerObject])
    }
  }

  const nextQues = () => {
    const nextQues = number + 1
    if(nextQues === Total_Ques){
      setGameOver(true)
    }
    else{
      setNumber(nextQues)
    }
  }

  return (
    <div className="App">
      <h1>React Quiz</h1>
      {gameOver || userAnswer.length === Total_Ques ? (
        <button className="start" onClick={startQuiz}>Start</button>
      ) : null}
      {!gameOver ? <p className="score">Score: {score}</p> : null}
      {loading && <p>Loading Questions ...</p>}
      {!loading && !gameOver && (
        <QuesCard quesNr={number + 1} totalQues={Total_Ques} question={questions[number].question} options={questions[number].options} userAnswer={userAnswer ? userAnswer[number] : undefined} callback={checkAnswer} />)}
      {!loading && !gameOver && userAnswer.length === number + 1 && number !== Total_Ques - 1 ? <button className="next" onClick={nextQues}>Next</button> : null}
    </div>
  );
}

export default App;
