import { getUserFromClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"
import { update } from '@/utils/actions'

export const DELETE = async (request: Request, { params }) => {
  const user = await getUserFromClerkID()

  await prisma.journalEntry.delete({
    where: {
      userId_id: {
        id: params.id,
        userId: user.id,
      },
    },
  })

  update(['/journal'])

  return NextResponse.json({ data: { id: params.id } })
}

export const PATCH = async (request, {params}) => {
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

  return NextResponse.json({data: updatedEntry})
}