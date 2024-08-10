import { NextResponse } from "next/server";
import { firestore } from "@/firebase.js";
import { getDoc, doc } from "firebase/firestore";

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
      const companyData = docSnap.data();
      return NextResponse.json(companyData);
    } else {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }
  } catch (e) {
    console.error("Error fetching company data: ", e);
    return NextResponse.json({ error: 'Failed to fetch company data' }, { status: 500 });
  }
}