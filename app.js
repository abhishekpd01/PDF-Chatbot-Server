import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fileRouter from './routes/file.routes.js';
import vectordbRouter from './routes/vectordb.routes.js';
import chatRouter from './routes/chat.routes.js';

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get('/', (req, res) => {
    return res.json({ message: 'Welcome to PDF Chatbot Server!' });
})

app.use(fileRouter);
app.use(vectordbRouter);
app.use(chatRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));