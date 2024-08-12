import { PineconeClient } from "@pinecone-database/pinecone";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { firestore } from "firebase-admin";


// Initialize Pinecone
const pinecone = new PineconeClient();
await pinecone.init({
  environment: process.env.PINECONE_ENVIRONMENT,
  apiKey: process.env.PINECONE_API_KEY,
});

const INDEX_NAME = "company-docs";

// Initialize OpenAI
const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
});
const model = new ChatOpenAI({
  temperature: 0,
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// Text splitter
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

async function uploadDocument(company, documentId) {
  const index = pinecone.Index(INDEX_NAME);

  // Check if namespace exists, create if it doesn't
  const indexStats = await index.describeIndexStats();
  if (!indexStats.namespaces[company]) {
    await index.createNamespace(company);
  }

  // Retrieve the document from Firestore
  const docRef = firestore().collection(company).doc(documentId);
  const doc = await docRef.get();

  if (!doc.exists) {
    throw new Error("Document not found");
  }

  const docData = doc.data();
  const fileContent = docData.content;
  const fileType = docData.type;

  if (!fileContent || !fileType) {
    throw new Error("Invalid document data");
  }

  // Process the file content
  let documents;
  if (fileType === 'pdf') {
    const loader = new PDFLoader(new Blob([fileContent]));
    documents = await loader.load();
  } else if (fileType === 'txt') {
    const loader = new TextLoader(new Blob([fileContent]));
    documents = await loader.load();
  } else {
    throw new Error("Unsupported file type");
  }

  const texts = await textSplitter.splitDocuments(documents);

  // Create embeddings and upsert to Pinecone
  await PineconeStore.fromDocuments(texts, embeddings, {
    pineconeIndex: index,
    namespace: company,
    textKey: "text",
  });

  return "Document uploaded and processed successfully";
}

async function queryChatbot(company, question) {
  const index = pinecone.Index(INDEX_NAME);

  // Retrieve the company's namespace
  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex: index,
    textKey: "text",
    namespace: company,
  });

  // Create a conversational chain
  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever({ searchKwargs: { k: 3 } }),
    { returnSourceDocuments: true }
  );

  // Get the response
  const response = await chain.call({
    question,
    chat_history: [],
  });

  return {
    answer: response.text,
    sources: response.sourceDocuments.map(doc => doc.metadata),
  };
}