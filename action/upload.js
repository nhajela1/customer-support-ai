'use server';
import { storage } from '@/firebase.js';
import { ref, getStorage, uploadBytes, getDownloadURL } from 'firebase/storage';

export async function upload(formData) {
  // Upload the file to Firebase Storage under the directory 'uploads'
  const storageRef = ref(storage, "uploads");
  const data = formData;
  const file = data.get('file');
  console.log('file', file);
  const fileRef = ref(storageRef, file.name);
  await uploadBytes(fileRef, file);
  console.log('Uploaded a blob or file!');

  // Get the download URL for the file
  const downloadURL = await getDownloadURL(fileRef);

  return downloadURL;
}