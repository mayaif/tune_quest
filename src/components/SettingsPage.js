import React, {useState, useEffect} from 'react';

import Question from './Question';

function SettingsPage() {

  const [questions, setQuestions] = useState([])
  const [score, setScore] = useState(null)
  const [answers, setAnswers] = useState({})

  //fetch data from API
   //ignore var set to false to track whether or not to ignore response from API call
   //if questions array is empty fetches data from the API endpoint
   //fetch func returns a Promise  that when resolved returns a json resp from the API
   //the json data is passed to setQuestions to update the state of the questions array
   //the hook returns an anonymus func that sets ignore to true to avoid memory leaks when the component is unmounted
  useEffect(() => {
    let ignore = false
    
    if (questions.length === 0){
      fetch(process.env.REACT_APP_API_KEY)
      .then(res => res.json())
      .then(data => {
        if(!ignore){
          setQuestions(data.results)
        }
      })
    }
    return () => {
      ignore = true
    }
  }, [questions])

  function answerOptions(questionID, answerOption) {
    setAnswers(prevAnswer => ({...prevAnswer, [questionID]: answerOption}))
  }

  const checkAnswers = () => {
    const correctAnswers = questions.map(question => question.correct_answer)
    const totalCorrectAnswers = correctAnswers.filter((correctAnswer, index) => correctAnswer === answers[index])
    setScore(totalCorrectAnswers.length)
  }
  
  const playAgain = () => {
    setQuestions([])
    setAnswers({})
    setScore(null)
  }

  if(questions.length === 0) {
    return (
      <div className='loading-page'>Loading...</div>
    )
  }


  const questionElements = questions.map((questionTrivia, questionID) => {
    return (
      <Question
        key={questionID} 
        question = {questionTrivia.question}
        incorrectOptions={questionTrivia.incorrect_answers}
        correctOption={questionTrivia.correct_answer}
        chosenAnswer={answers[questionID]}
        answerOptions={(answerOption) => answerOptions(questionID, answerOption)}
        disabled={score !== null}
      />
    )
  })

  return (
    <main className='quizz-page'>
      {questionElements}
      
      <div className='trivia-result'>
        {score !== null && (
          <p className='result-displayed'>
            You scored {score}/{questions.length} correct answers
          </p>
       )}
        {score === null ? 
          <button
            disabled={questions.length !== Object.keys(answers).length}
            className="check-answers"
            onClick={checkAnswers}
          >
            Check answers
          </button>
          : 
          <button className="check-answers" onClick={playAgain}>
            {score === questions.length ? "Try again" : "Play again"}
          </button>
        } 
 
      </div>
      
    </main>
  );
}

export default SettingsPage;
