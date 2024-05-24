// import { getUserFromClerkID } from "@/utils/auth"
// import { prisma } from "@/utils/db"
// import HistoryChart from "@/components/HistoryChart"
'use client'
// import { useState } from "react"
import FeelingsWheel from "@/components/FeelingsWheel"

const FeelingsPage = () => {
  // const { analyses, average } = await getData()
  return (
    <div className="h-full px-6 py-8">
      <div>
        <h1 className="text-2xl mb-4">Feelings Wheel</h1>
      </div>
      <div className="h-full w-full">
        <FeelingsWheel />
      </div>
    </div>
  )
}

export default FeelingsPage