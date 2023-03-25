import './App.css'
import { useState, useEffect } from 'react';
import axios from 'axios'


function App() {

  const [aiQuestion, setAiQuestion] = useState('')
  const [aiText, setAiText] = useState([])
  const [message, setMessage] = useState('')
  const [aiHistory, setAiHistory] = useState([])

  const messageBar = (event) => {
    const setter = event.target.value
    setMessage(setter)
    console.log(setter)
  }

  const submitHandler = (e) => {
    setAiQuestion(message)
    console.log("aiQuestion:" + aiQuestion)
    e.preventDefault()
    setMessage('')
  }

  useEffect(() => {
    if (aiQuestion) {
      const aiFetch = async () => {
        try {
          const response = await axios.get('http://localhost:4001/ai', {
            params: {
              aiQuestion
            }
          }, 
          {
            headers: {
            'Content-Type': 'application/json',
          }
          })
          // setAiText(response.data.choices[0].text)
          setAiText(x => [...x, response.data.content])
          console.log(response.data.content)
        } catch (error) {
          console.error(error)
        } 
      }
      aiFetch()
    }
  }, [aiQuestion])

  
  useEffect(() => {
    const data = window.localStorage.getItem('AI_txt')
    console.log('local storage data', data)
    if ( data !== null ) setAiHistory(JSON.parse(data))
  },[])
  
  useEffect(() => {
    window.localStorage.setItem('AI_txt', JSON.stringify(aiText))
  },[aiText])

  return (
    <>
      <div className="font-bold mt-40 text-center">
        <div className='mb-10'>penis</div>
        <div className='bg-zinc-100'>
          <div>Message here</div>
          <div>
            <form onSubmit={submitHandler}>
              <input
                value={message}
                onChange={messageBar}
                placeholder='ask AI'
                className='bg-purple-200' />
            </form>
          </div>

        </div>

        <div>
          <div>Output</div>
          <div className='bg-purple-100'>{aiQuestion && 'aiQuestion: '}<br />{aiQuestion && aiQuestion}</div>
          <div  className='flex flex-col-reverse gap-2'>AI: 
            {aiText && aiText
            .map((x, index) => 
            <div key={index}>
              {x}
            </div>
          )}
          </div>
          <div>History: {aiHistory}</div>
        </div>

      </div>
    </>
  );
}

export default App;
