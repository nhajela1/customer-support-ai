// This route contains the logic for uploading a file to the OpenAI API. The file is uploaded to Firebase Storage, and the file metadata is stored in Firestore. The file is then sent to the OpenAI API, which returns a response containing the generated text. The response is then sent back to the client.

import { firestore } from '@/firebase.js';
import { storage } from '@/firebase.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, doc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const data = await req.json();
  const file = data.file;
  const companyId = data.companyId;
  const storageRef = ref(storage, `files/${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);

  // Store file metadata in Firestore
  const companyRef = doc(firestore, 'companies', companyId);
  const uploadedFilesRef = collection(companyRef, 'uploaded_files');
  response = await addDoc(uploadedFilesRef, {
    fileName: file.name,
    fileUrl: downloadURL,
    createdAt: new Date(),
  });

  if (response.ok) {
    return NextResponse.json({ success: true, fileUrl: downloadURL });
  } else {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}