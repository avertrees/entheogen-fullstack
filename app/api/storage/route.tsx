import type { NextApiRequest, NextApiResponse } from 'next'
import { initializeApp } from 'firebase/app'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import { firebaseConfig } from '@/firebase'
// https://dev.to/reeshee/how-to-use-firebase-storage-to-upload-and-retrieve-files-in-nextjs-pages-router-2p16
async function filePOST(request: NextApiRequest, res: NextApiResponse) {
  // Initialize the Firebase app with the provided configuration
  const app = initializeApp(firebaseConfig)
  // Get a reference to the Firebase Storage and parse the request data as a FormData object
  const storage = getStorage(app)
  // More code to handle uploads incoming...
}



async function fileGET(request: NextApiRequest, res: NextApiResponse) {
  // Extract the 'file' parameter from the request URL.
  const file = request.query.file
  // Check if the 'image' parameter exists in the URL.
  if (file && typeof file === 'string') {
    try {
      // Initialize the Firebase app with the provided configuration.
      const app = initializeApp(firebaseConfig)
      // Get a reference to the Firebase storage.
      const storage = getStorage(app)
      // Create a reference to the specified file in storage.
      const fileRef = ref(storage, file)
      // Get the download URL of the file.
      const filePublicURL = await getDownloadURL(fileRef)
      // Return a JSON response with the file's public URL and a 200 status code.
      return res.status(200).json({ filePublicURL })
    } catch (e: any) {
      // If an error occurs, log the error message and return a JSON response with a 500 status code.
      const tmp = e.message || e.toString()
      console.log(tmp)
      return res.status(500).send(tmp)
    }
  }
  // If the 'file' parameter is not found in the URL, return a JSON response with a 400 status code.
  return res.status(400).json({ error: 'Invalid Request' })
}

export const GET = async (request: NextApiRequest, response: NextApiResponse) => {
  return await fileGET(request, response)
} 

export const POST = async (request: NextApiRequest, response: NextApiResponse) => {
  await filePOST(request, response)
} 

// Disable parsing the body by Next.js default behavior
export const config = {
  api: {
    bodyParser: false,
  },
}
