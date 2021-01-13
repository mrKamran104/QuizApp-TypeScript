import React from 'react'
import { QuesPropsType } from '../Types/quiz_types'

function QuesCard({ question, options, callback, userAnswer, quesNr, totalQues }: QuesPropsType) {
    return (
        <div>
            <h6 className="quiz_header">Question: {quesNr} / {totalQues}</h6>
            <div className="quiz_body text-start">

                <p className="mb-4" dangerouslySetInnerHTML={{ __html: "Q" + quesNr + ": " + question }} />
                <div>
                    {options.map((option) => (
                        <div key={option}>
                            <button disabled={!!userAnswer} className="option"
                                style={{ background: userAnswer?.correctAnswer === option ? "green" : !(userAnswer?.correctAnswer === option) && userAnswer?.answer === option ? "red" : "white" }}
                                value={option} onClick={callback}>
                                <span dangerouslySetInnerHTML={{ __html: option }} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default QuesCard
