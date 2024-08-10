import { NextResponse } from "next/server";
import { firestore } from "@/firebase.js";
import { setDoc, doc } from "firebase/firestore";

export async function POST(req) {
  const data = await req.json();
  console.log("Data: ", data);
  const { companyID, companyName, fileURL, description } = data;
  console.log("Company ID: ", companyID);
  console.log("Company Name: ", companyName);
  console.log("File URL: ", fileURL);
  console.log("Description: ", description);

  try {
    await setDoc(doc(firestore, "companies", companyID), {
      companyName,
      fileURL,
      description,
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Error adding document: ", e);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}