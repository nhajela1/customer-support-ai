import { NextResponse } from 'next/server'
import { firestore } from "@/firebase.js";
import { updateDoc, doc } from "firebase/firestore";
import { auth } from "@/utils/firebase";

export async function POST(req) {
  const data = await req.json()
  const { companyID } = data;

  if (!companyID) {
    return NextResponse.json({ error: 'Company ID is required' }, { status: 400 });
  }

  const user = auth.currentUser;
  if (!user) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }

  try {
    const userRef = doc(firestore, "users", user.uid);
    await updateDoc(userRef, { companyID });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Error updating user document: ", e);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}