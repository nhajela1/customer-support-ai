import { NextResponse } from "next/server";
import { Firestore } from "firebase/firestore";

export async function POST(req) {
  const data = await req.json();
  const companyID = data.companyID;
  const companyName = data.companyName;
  const fileUrl = data.fileUrl;
  const db = Firestore();
  const docRef = db.collection("companies").doc(companyID);
  const response = await docRef.set({
    companyName: companyName,
    fileUrl: fileUrl,
  });

  if (response) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}