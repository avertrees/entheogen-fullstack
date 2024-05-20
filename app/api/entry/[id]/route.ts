import { update } from '@/utils/actions'
import { analyze } from '@/utils/ai'
// import { analyzeEntry } from '@/utils/ai'
import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export const DELETE = async (request: Request, { params }) => {
  const user = await getUserFromClerkID()

  const entry = await prisma.journalEntry.delete({
    where: {
      journalEntryId: {
        id: params.id,
        userId: user.id,
      },
    },
  })

  update(['/journal'])

  return NextResponse.json({ data: { id: params.id } })
}

export const PATCH = async (request: Request, {params}) => {
  // const { updates } = await request.json()
  const { content } = await request.json()
  const user = await getUserFromClerkID()
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        id: params.id,
        userId: user.id,
      },
    },
    // data: updates,
    data: {
      content,
    }
  })

  const analysis = await analyze(updatedEntry.content)


  const updatedAnalysis = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    create: {
      userId: user.id,
      entryId: updatedEntry.id,
      ...analysis
    },
    update: {
       ...analysis 
    }
  })
  
  revalidatePath(`/journal/${updatedEntry.id}`)

  return NextResponse.json({data: {...updatedEntry, analysis: updatedAnalysis}})
}

// export const PATCH = async (request: Request, { params }) => {
//   const { updates } = await request.json()
//   const user = await getUserFromClerkID()

//   const entry = await prisma.journalEntry.update({
//     where: {
//       userId_id: {
//         id: params.id,
//         userId: user.id,
//       },
//     },
//     data: updates,
//   })

//   // const analysis = await analyzeEntry(entry)
//   // const savedAnalysis = await prisma.entryAnalysis.upsert({
//   //   where: {
//   //     entryId: entry.id,
//   //   },
//   //   update: { ...analysis },
//   //   create: {
//   //     entryId: entry.id,
//   //     userId: user.id,
//   //     ...analysis,
//   //   },
//   // })

//   update(['/journal'])
//   return NextResponse.json({ data: { ...entry } })

//   // return NextResponse.json({ data: { ...entry, analysis: savedAnalysis } })
// }