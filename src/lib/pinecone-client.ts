import { Pinecone } from '@pinecone-database/pinecone';

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY
});
const indexName = "content-ideas";

export const pineconeIndex = pinecone.Index(indexName);

export const createIndex = async () => {
  try {
    await pinecone.createIndexForModel({
      name: indexName,
      cloud: 'aws',
      region: 'us-east-1',
      embed: {
        model: 'llama-text-embed-v2',
        fieldMap: { text: 'chunk_text' },
      },
      waitUntilReady: true,
    });
  } catch (error: any) {
    console.log("error-logging", error);
  }
};