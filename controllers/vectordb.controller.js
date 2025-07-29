import vectorStore from "../config/qdrantdb.config.js";

const cleanUp = async (req, res) => {
    const _id = req.body.email;

    try {
        // Ensure index exists for filtering
        await vectorStore.client.createPayloadIndex('pdf-docs', {
            field_name: 'metadata.id',
            field_schema: 'keyword'
        });
    } catch (err) {
        console.warn('Index creation skipped or failed (maybe it already exists):', err.message);
    }

    const deletePayload = {
        filter: {
            must: [
                {
                    key: 'metadata.id',
                    match: { value: _id }
                }
            ]
        }
    };

    console.log('Deleting with payload:', JSON.stringify(deletePayload, null, 2));

    try {
        await vectorStore.client.delete('pdf-docs', deletePayload);
        return res.json({ message: `Deleted all points with metadata.id = ${_id}` });
    } catch (error) {
        console.error('Error during deletion:', error);
        return res.status(500).json({ message: 'Failed to delete vectors', error });
    }
}

export default cleanUp;