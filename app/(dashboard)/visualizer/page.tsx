import Uploader from '@/components/FileUploader'
import { Visualizer } from '@/components/Visualizer'
const getEEGData = async () => {
  // const user = await getUserFromClerkID
  // const entry = await prisma.journalEntry.findMany({
  //   where:{
  //     userId: user.id,
  //   },
  //   orderBy:{
  //     createdAt: 'desc'
  //   }
  //  })
  //  eegData =
  //  return eegData
}

const VisualizerPage = async () => {
  // const data = await getEEGData()
  // console.log('data ', data)
  return (
    <div className="px-6 py-8 bg-zinc-100/50 h-full">
      <h2 className="text-4xl mb-12">Journal</h2>
      <div className="my-8">
        Visualization
        <Uploader />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Visualizer />
      </div>
    </div>
  )
}

export default VisualizerPage
