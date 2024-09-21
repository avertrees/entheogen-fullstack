'use client'
import AnyChart from 'anychart-react'
import { data } from '@/data/feelings/data'

const FeelingsWheel = () => {
  const handleClick = (d) => {
    console.log('clicked')
    console.log(d)
  }

  return (
    <AnyChart
      type="sunburst"
      data={data}
      height={1000}
      width={1000}
      labels={{ position: 'radial', fontColor: 'black', fontWeight: 'bold' }}
      // selected={{ color: '#96a6a6', }}
      listen={{
        click: handleClick,
      }}
    />
  )
}

export default FeelingsWheel
