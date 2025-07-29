import { Worker } from 'bullmq';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import fs from 'fs';
import vectorStore from './config/qdrantdb.config.js';


const worker = new Worker('pdf-upload-queue', async (job) => {
    console.log("Processing Job:", job.data);
    const data = JSON.parse(job.data);

    /*
    1. Path: data.path
    2. read the pdf from the path
    3. Chunk the pdf
    4. call the embedding model for each chunk
    5. Store the chunks in the qDrant db
    */

    // Load the PDF
    const loader = new PDFLoader(data.path);
    let docs = await loader.load();
    console.log("PDF loaded successfully");

    // Attach data.id (user emailId) to each doc
    docs = docs.map(doc => ({
        ...doc,
        metadata: {
            ...(doc.metadata || {}),
            id: data.id
        }
    }));

    // add document to vectorDB
    try {
        await vectorStore.addDocuments(docs);
        console.log("Document added successfully to vector DB")
    } catch (error) {
        console.error('Error occured while adding document', error);
    }

    // Deleting the uploaded file after processing from '/uploads'
    fs.unlink(data.path, (err) => {
        if (err) {
            console.error('Error deleting file from /uploads:', err);
        } else {
            console.log('File deleted successfully from /uploads');
        }
    });

}, {
    concurrency: 100,
    connection: {
        host: process.env.HOST,
        port: parseInt(process.env.REDIS_PORT, 10),
        password: process.env.REDIS_PASSWORD
    },
    maxStalledCount: 5
});