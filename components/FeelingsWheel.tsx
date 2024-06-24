'use client'
import AnyChart from 'anychart-react'
import { data } from '@/data/feelings/data'

const FeelingsWheel = () => {
  return (
    <AnyChart
      type="sunburst"
      data={data}
      title="Feelings Wheel"
      height={800}
      width={800}
    />
  )
}

export default FeelingsWheel
