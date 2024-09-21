// https://firebase.google.com/docs/storage/web/upload-files

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/firebase.config";

import { getStorage, ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage";
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// // Get a reference to the storage service, which is used to create references in your storage bucket
// const storage = getStorage();

// // Create a storage reference from our storage service
// const storageRef = ref(storage);

// // Create a child reference
// const imagesRef = ref(storage, 'images');
// // imagesRef now points to 'images'

// // Create a child reference
// const eegRef = ref(storage, 'eeg');
// // eegRef now points to 'eeg'

// // Create a child reference
// const museRef = ref(storage, 'muse');
// // museRef now points to 'muse

// // Child references can also take paths delimited by '/'
// const spaceRef = ref(storage, 'images/space.jpg');
// // spaceRef now points to "images/space.jpg"
// // imagesRef still points to "images"

// // Points to 'images/space.jpg'
// // Note that you can use variables to create child values
// const fileName = 'space.jpg';
// const spaceRef2 = ref(imagesRef, fileName);

// // File path is 'images/space.jpg'
// const path = spaceRef2.fullPath;

// // File name is 'space.jpg'
// const name = spaceRef2.name;

// // Points to 'images'
// const imagesRefAgain = spaceRef2.parent;


// file upload

export const Upload = (file) => {
  // https://firebase.google.com/docs/storage/web/upload-files
  const storage = getStorage();

  // Create the file metadata
  /** @type {any} */
  const metadata = {
    contentType: 'image/jpeg'
    // contentType: 'text/json'
  };
  
  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, 'images/' + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);
  
  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          console.log("Error: storage/unauthorized:  User doesn't have permission to access the object")
          break;
        case 'storage/canceled':
          // User canceled the upload
          console.log("Error: storage/canceled: User canceled the upload")
          break;
  
        // ...
  
        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          console.log("Error: storage/unknown: Unknown error occurred, inspect error.serverResponse")
          break;
      }
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
      });
    }
  );
}

export const Download = async (uuid) => {
  const storage = getStorage();

  // const starsRef = ref(storage, 'images/stars.jpg');
  //020164cc-7d0b-4b61-8c37-4b38be8e52a5.json - eeg/
  // 020164cc-7d0b-4b61-8c37-4b38be8e52a5 - muse/

  const eegRef = ref(storage, `/muse/${uuid}.json`);
  console.log("eeg ref is: ", eegRef)
  let dataURL = ""
  // Get the download URL
   getDownloadURL(eegRef)
    .then((url) => {
      // Insert url into an <img> tag to "download"
      let res = ""
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json'; 
      xhr.onload = function(event) {
        var json= xhr.response;
        console.log(json);      // now you read the file content
        res = json
      };
      xhr.open('GET', url);
      xhr.send();
      console.log("xhr: ", xhr)
      return res
      // console.log("url in eegRef is: ", url)
      // dataURL = url
      // return url //`${url}alt=media&token=09a53f76-5b1f-450c-bf3c-dae19fe321d7`
    })
    .catch((error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      console.log("error in eegRef: ", error)
      switch (error.code) {
        case 'storage/object-not-found':
          // File doesn't exist
          return "File doesn't exist"
          break;
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          return " User doesn't have permission to access the object"
          break;
        case 'storage/canceled':
          // User canceled the upload
          return " User canceled the upload"
          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect the server response
          return "Unknown error occurred, inspect the server response"
          break;
      }
    });
    return dataURL
}