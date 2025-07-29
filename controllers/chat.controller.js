import vectorStore from "../config/qdrantdb.config.js";
import openai from "../config/openai.config.js";

const chat = async (req, res) => {
    const userQuery = req.query.message;

    // Retrieves the documents from vector DB
    const retriever = vectorStore.asRetriever({
        k: 2
    })

    const result = await retriever.invoke(userQuery);
    
    const SYSTEM_PROMPT = `
        You are a helpful assistant that answers questions based on the provided PDF context.
        Context: ${JSON.stringify(result)}
    `

    const response = await openai.chat.completions.create({
        model: 'gemini-2.0-flash',
        messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: userQuery }
        ]
    });

    return res.json({
        message: response.choices[0].message.content,
        docs: result
    });
}

export default chat;