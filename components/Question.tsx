'use client'

import { askQuestion } from "@/utils/api"
import { useState } from "react"
import Spinner from "./Spinner"
export const Question = () => {
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState('')

  const onChange = (e) =>{
    setQuestion(e.target.value)
    //do things 
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    setLoading(true)
    const { data } = await askQuestion(question)
    setResults(data)
    setQuestion('')
    setLoading(false)
  }

  return (
    <>
    <div>
    <form onSubmit={handleSubmit}>
      <input 
        onChange={onChange}
        type="text" 
        placeholder="Ask a question..." 
        className="border border-black/20 px-4 py-2 text-lg rounded-lg"
      />
      <button 
        disabled={loading}
        type="submit" 
        className="bg-blue-400 px-4 py-2 rounded-lg text-lg">
          ask
      </button>
    </form>
    {loading && <Spinner/>}
    {results && <div> {results} </div>}
    </div>
    </>
  )
}