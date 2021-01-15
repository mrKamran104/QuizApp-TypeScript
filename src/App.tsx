import React, { useState, useEffect } from 'react';
import QuesCard from './components/QuesCard';
import { Difficulty, fetchQuizQues } from './services/quiz_service';
import { Quiz } from './Types/quiz_types';
import './App.css'
import configNotification from './firebase';

const Total_Ques = 5

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

  useEffect(() => {
    configNotification()
  }, [])

  const startQuiz = async () => {
    setLoading(true)
    setGameOver(false)

    const fetchQues = await fetchQuizQues(Total_Ques, Difficulty.Easy)
    setQuestions(fetchQues)
    setScore(0)
    setUserAnswer([])
    setNumber(0)
    setLoading(false)
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
    if (nextQues === Total_Ques) {
      setGameOver(true)
    }
    else {
      setNumber(nextQues)
    }
  }

  return (
    <div >
      <h1 className="my-3">React Quiz</h1>

      {!loading && (gameOver || userAnswer.length === Total_Ques) ? (
        <div className={number !== Total_Ques - 1 ? "start" : ""}>
          <button className="button" onClick={startQuiz}>Start</button>
        </div>
      ) : null}

      {!gameOver ? <p className="my-3 score">Score: {score}</p> : null}

      {loading && <p>Loading Questions ...</p>}
      <div className="quiz">

        {!loading && !gameOver && (
          <QuesCard quesNr={number + 1} totalQues={Total_Ques} question={questions[number].question} options={questions[number].options} userAnswer={userAnswer ? userAnswer[number] : undefined} callback={checkAnswer} />)}
      </div>
      {!loading && !gameOver && userAnswer.length === number + 1 && number !== Total_Ques - 1 ? <button className=" btn-next" onClick={nextQues}>Next</button> : null}
    </div>
  );
}

export default App;
