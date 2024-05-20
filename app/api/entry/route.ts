import { update } from '@/utils/actions'
import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'
import { revalidatePath } from "next/cache"
import { analyze } from '@/utils/ai'

export const POST = async (request: Request) => {
  const data = await request.json()
  const user = await getUserFromClerkID()

  const entry = await prisma.journalEntry.create({
    data: {
      user: {
        connect: {
          id: user.id,
        },
      },
      content: data.content,
      // analysis: {
      //   create: {
      //     mood: 'Neutral',
      //     negative: false,
      //     summary: 'None',
      //     color: '#0101fe',
      //     userId: user.id,
      //   },
      // },
      // ...analysis
    },
  })

  const analysis = await analyze(entry.content)
  const newAnalysis = await prisma.analysis.create({
    data: {
      userId: user.id,
      entryId: entry.id,
      ...analysis,
    }
  })

  // revalidatePath('/journal')
  update(['/journal'])

  return NextResponse.json({ data: entry })
}