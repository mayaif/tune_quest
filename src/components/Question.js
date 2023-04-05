import React, {useMemo} from "react"
import shuffle from "./shuffle"
export default function Question(props) {

  const options = useMemo(() => shuffle([...props.incorrectOptions, props.correctOption]), [props.correctOption, props.incorrectOptions])

  return(
    <div className="question">
      <p>{decodeURIComponent(props.question || 'Loading...')}</p>
      <div className='answer--section'>
        {options.map((option, index) => (
          <button 
            key={index}
            disabled={props.disabled}
            className={`option 
            ${props.chosenAnswer === option && "chosen"} 
            ${props.disabled && option === props.correctOption && "correct"}
            ${props.disabled && props.chosenAnswer !== props.correctOption && option === props.chosenAnswer && "wrong"}
            `}
            onClick={() => props.answerOptions(option)}
          >
            {decodeURIComponent(option)}
          </button>
        ))}
      </div>
      <hr />
    </div>
    
  )
}