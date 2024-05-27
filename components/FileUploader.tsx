// Use next app router, server components, and server actions to upload files to firebase storage
//
// you probably dont want to do this since just storing images in the next public folder is usually best
// but if for some reason you need to upload files to firebase storage from nextjs, here you go
// also worth noting that the firebase-admin storage sdk has almost no documentation
// and from what I can tell does almost nothing, but it's just a wrapper around the google cloud storage sdk
// so you can use that instead if you want better documentation and functionality
'use client'
import {Upload} from '@/utils/firebase'

const Uploader = () => {
  // const handleOnClick = async () => {
    
  //   console.log("data is : ", data)
  //   // router.push(`/journal/${data.id}`)
  // }
   const handleFormData = async (formData: FormData) => {
    const file = formData.get("file") as File;
    console.log("file is: ", file)
    const res = await Upload(file)
    console.log("res is, ", res)
  }
  return (
    <div>
      <h1>Upload an image</h1>
      <form action={handleFormData}>
        <label>
          {/* <input
            type="file"
            name="file"
            accept="image/png, image/jpeg, image/gif"
          /> */}
          <input
            type="file"
            name="file"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Uploader;