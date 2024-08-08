import { NextResponse } from "next/server";
import { Firestore } from "firebase/firestore";

export async function POST(req) {
  data = await req.json();
  companyID = data.companyID;
  companyName = data.companyName;
  fileUrl = data.fileUrl;

  // Store the company ID, company name, and file URL in the database
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