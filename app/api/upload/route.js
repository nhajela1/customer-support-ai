// This route contains the logic for uploading a file to the OpenAI API. The file is uploaded to Firebase Storage, and the file metadata is stored in Firestore. The file is then sent to the OpenAI API, which returns a response containing the generated text. The response is then sent back to the client.

// Code starts here:

import { firestore } from '@/firebase.js';
import { storage } from '@/firebase.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, doc } from 'firebase/firestore';

async function uploadFile(file, companyId, description) {
  const storageRef = ref(storage, `files/${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);

  // Store file metadata in Firestore
  const companyRef = doc(firestore, 'companies', companyId);
  const uploadedFilesRef = collection(companyRef, 'uploaded_files');
  await addDoc(uploadedFilesRef, {
    fileName: file.name,
    fileUrl: downloadURL,
    description: description,
    createdAt: new Date(),
  });

  return downloadURL;
}

export default uploadFile;
