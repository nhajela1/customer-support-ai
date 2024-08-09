import { NextResponse } from 'next/server' // Import NextResponse from Next.js for handling responses
import OpenAI from 'openai' // Import OpenAI library for interacting with the OpenAI API
import { firestore } from "@/firebase.js";
import { doc, getDoc } from "firebase/firestore";

// POST function to handle incoming requests
export async function POST(req) {
  const openai = new OpenAI() // Create a new instance of the OpenAI client
  const { companyID, messages } = await req.json() // Parse the JSON body of the incoming request

  try {
    // Fetch the system prompt for the company
    const docRef = doc(firestore, "companies", companyID);
    const docSnap = await getDoc(docRef);
    
    let systemPrompt = "You are a helpful assistant.";
    if (docSnap.exists()) {
      systemPrompt = docSnap.data().systemPrompt || systemPrompt;
    }

    // Create a chat completion request to the OpenAI API
    const completion = await openai.chat.completions.create({
      messages: [{role: 'system', content: systemPrompt}, ...messages], // Include the custom system prompt and user messages
      model: 'gpt-4o-mini', // Specify the model to use
      stream: true, // Enable streaming responses
    })

    // Create a ReadableStream to handle the streaming response
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder() // Create a TextEncoder to convert strings to Uint8Array
        try {
          // Iterate over the streamed chunks of the response
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content // Extract the content from the chunk
            if (content) {
              const text = encoder.encode(content) // Encode the content to Uint8Array
              controller.enqueue(text) // Enqueue the encoded text to the stream
            }
          }
        } catch (err) {
          controller.error(err) // Handle any errors that occur during streaming
        } finally {
          controller.close() // Close the stream when done
        }
      },
    })

    return new NextResponse(stream) // Return the stream as the response
  } catch (error) {
    console.error('Error in chat route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}