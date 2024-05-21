'use client'
import { useState } from "react"
import { useAutosave } from "react-autosave"
import { updateEntry } from "@/utils/api"
import Spinner from './Spinner'
import FeelingsWheel from "@/components/FeelingsWheel"

const Editor = ({entry}) => {
  const [value, setValue] = useState(entry.content)
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState(entry.analysis)

  const {mood, summary, color, subject, negative} = analysis
  const analysisData = [
    {name: 'Summary', value: summary},
    {name: 'Subject', value: subject},
    {name: 'Mood', value: mood},
    {name: 'Negative', value: negative ? 'True' : 'False'},
    {name: 'Color', value: color}
  ]

  useAutosave({
    data: value,
    onSave: async (_text) => {
      if (_text === entry.content) return
      setIsLoading(true)
      const data = await updateEntry(entry.id, _text)
      setAnalysis(data.analysis)
      setIsLoading(false)
    }
  })
  
  return (
    <div className="w-full h-full grid grid-cols-3 gap-0 relative">
      <div className="absolute left-0 top-0 p-2">
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="w-[16px] h-[16px] rounded-full bg-green-500"></div>
        )}
      </div>
      <div className="col-span-2">
      <textarea className="w-full h-full p-8 text-xl outline-none" value={value} onChange={(e)=>setValue(e.target.value)} />
      </div>
      <div className="border-l border-black/5">
        <div className="px-6 py-10" style={{backgroundColor: color}}>
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
            <ul>
              {analysisData.map(item=>(
              <li key={item.name} className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10">
                <span className="text-lg font-semibold">{item.name}</span>
                <span>{item.value}</span>
              </li>
              ))}
            </ul>
            <FeelingsWheel />
        </div>
      </div>
      </div>
  )
}

export default Editor