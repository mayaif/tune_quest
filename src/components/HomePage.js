
import { Link } from "react-router-dom"


export default function HomePage() {
  return (
   <main className='home-page'>
      <h1 className='app--name'>TuneQuest</h1>
      <p className='description'>Unleash Your Inner Music Expert with Every Question</p>
      <Link to="/trivia">Start Quiz</Link>
    {/* <button className='start--quiz'>Start quiz</button> */}
    </main>
  )
}