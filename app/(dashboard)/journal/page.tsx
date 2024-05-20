import EntryCard from "@/components/EntryCard"
import NewEntry from "@/components/NewEntry"
import { getUserFromClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"
import Link from "next/link"
import { Question } from "@/components/Question"

const getEntries = async () => {
  const user = await getUserFromClerkID
  const entries = await prisma.journalEntry.findMany({
    where:{
      userId: user.id,
    },
    orderBy:{
      createdAt: 'desc'
    }
   })
   
   return entries
}

const JournalPage = async () => {
  const entries = await getEntries()
  console.log('entries ', entries)
  return (
    <div className="px-6 py-8 bg-zinc-100/50 h-full">
      <h2 className="text-4xl mb-12">Journal</h2>
      <div className="my-8">
        <Question />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <NewEntry />
        {entries.map((entry) => (          
          <div key={entry.id} >
            <Link key={entry.id} href={`/journal/${entry.id}`}>
              <EntryCard key={entry.id} entry={entry}/>
            </Link>            
          </div>
        ))}
      </div>
    </div>
  )
}

export default JournalPage