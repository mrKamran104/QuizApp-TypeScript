import React from 'react'
import { QuesPropsType } from '../Types/quiz_types'

function QuesCard({ question, options, callback, userAnswer, quesNr, totalQues }: QuesPropsType) {
    return (
        <div>
            {console.log(options)}
            <p className="number">
                Question: {quesNr} / {totalQues}
            </p>
            <p dangerouslySetInnerHTML={{ __html: question }} />
            <div>
                {options.map((option) => (
                    <div key={option}>
                        <button disabled={!!userAnswer} value={option} onClick={callback}>
                            <span dangerouslySetInnerHTML={{ __html: option }} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QuesCard
