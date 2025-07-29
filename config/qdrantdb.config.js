import 'dotenv/config'
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(__dirname, 'ai-agent-465405-ccb3e8b3e185.json');
console.log("Resolved credentials path:", process.env.GOOGLE_APPLICATION_CREDENTIALS);

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