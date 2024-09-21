'use client'
import FeelingsWheel from '@/components/FeelingsWheel'
// import SunburstAnyChart from '@/components/Sunburst'
import Image from 'next/image'
export default function Feelings() {
  return (
    <>
      {/* <Image
        alt="feelings wheel"
        src="/feelings.png"
        width={600}
        height={600}
      ></Image> */}
      <FeelingsWheel></FeelingsWheel>
    </>
  )
}
