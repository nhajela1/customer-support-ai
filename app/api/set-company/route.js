import { NextResponse } from "next/server";
import { firestore } from "@/firebase.js";
import { setDoc, doc } from "firebase/firestore";

export async function POST(req) {
  const data = await req.json();
  console.log("Data: ", data);
  const companyID = data.companyID;
  console.log("Company ID: ", companyID);
  const companyName = data.companyName;
  console.log("Company Name: ", companyName);
  const fileURL = data.fileURL;
  console.log("File URL: ", fileURL);

  // Add a new document with a generated ID
  try {
    await setDoc(doc(firestore, "companies", companyID), {
      companyName: companyName,
      fileURL: fileURL,
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Error adding document: ", e);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}