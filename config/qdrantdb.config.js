// Update your qdrantdb.config.js
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Instead of file path, use environment variable
if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
  // Write the JSON content to a temporary file
  const credentialsPath = path.resolve(__dirname, 'temp-credentials.json');
  require('fs').writeFileSync(credentialsPath, process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
  process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsPath;
} else {
  // For local development, keep the file path
  process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(__dirname, 'ai-agent-465405-ccb3e8b3e185.json');
}

import { QdrantVectorStore } from "@langchain/qdrant";
import { VertexAIEmbeddings } from '@langchain/google-vertexai';

const embeddings = new VertexAIEmbeddings({
    model: "text-embedding-004",
});
console.log("Embeddings model initialized successfully");

const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
    url: process.env.QDRANT_URL,
    apiKey: process.env.QDRANT_API_KEY,
    collectionName: 'pdf-docs',
});
console.log("Vector store initialized successfully");

export default vectorStore;