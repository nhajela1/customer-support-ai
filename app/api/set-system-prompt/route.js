import { NextResponse } from 'next/server'
import { firestore } from "@/firebase.js";
import { updateDoc, doc, getDoc } from "firebase/firestore";

export async function POST(req) {
  const data = await req.json()
  const { companyID, systemPrompt } = data;

  if (!companyID || !systemPrompt) {
    return NextResponse.json({ error: 'Company ID and system prompt are required' }, { status: 400 });
  }

  try {
    const docRef = doc(firestore, "companies", companyID);
    await updateDoc(docRef, { systemPrompt });
    console.log('System prompt set for company:', companyID, systemPrompt);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Error updating system prompt: ", e);
    return NextResponse.json({ error: 'Failed to update system prompt' }, { status: 500 });
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const companyID = searchParams.get('companyID');

  if (!companyID) {
    return NextResponse.json({ error: 'Company ID is required' }, { status: 400 });
  }

  try {
    const docRef = doc(firestore, "companies", companyID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { systemPrompt } = docSnap.data();
      console.log('Returning system prompt for company:', companyID, systemPrompt);
      return NextResponse.json({ systemPrompt });
    } else {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }
  } catch (e) {
    console.error("Error retrieving system prompt: ", e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}