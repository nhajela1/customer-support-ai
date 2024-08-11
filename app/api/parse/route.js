'use server'; // Use the server environment for this file

import { NextResponse } from 'next/server'; // Import NextResponse from Next.js for handling responses
import pdfParse from 'pdf-parse'; // Import pdf-parse library for parsing PDF files

export async function POST(req) {
  console.log('Parsing PDF file...');
  const data = await req.formData();
  console.log('Data:', data);
  const file = data.get('file');
  console.log('File:', file);
  const buffer = await file.arrayBuffer();
  console.log('Buffer:', buffer);
  const text = await pdfParse(buffer);
  console.log('Parsed text:', text.text);
  return NextResponse.json({ text: text.text });
}