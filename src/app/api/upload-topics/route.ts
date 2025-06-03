import { NextResponse } from 'next/server';
import { pineconeIndex, createIndex } from '@/lib/pinecone-client';
import { connectMongo } from '@/lib/mongo';
import { Topic } from '@/models/Topic';
import { parse } from 'csv-parse/sync';

const BATCH_SIZE = 96;

export async function POST(req: Request) {
  try {
    await connectMongo();
    const { topics } = await req.json();

    const records = parse(topics, { columns: true });

    await createIndex();
    const index = pineconeIndex;

    // Process topics in batches
    for (let i = 0; i < records.length; i += BATCH_SIZE) {
      const batch = records.slice(i, i + BATCH_SIZE);

      const upsertRecords = await Promise.all(batch.map(async (topic: any) => {

        const newTopic = new Topic({
          ...topic,
          volumeReached: parseInt(topic.volumeReached || "0"),
          competition: parseInt(topic.competition || "0"),
          costPerClick: parseFloat(topic.costPerClick || "0"),
        });
        await newTopic.save();

        return {
          id: newTopic._id.toString(),
          chunk_text: topic.suggestion,
          metadata: JSON.stringify({
            mongoId: newTopic.id
          })
        };

      }));

      // Create MongoDB document first
      await index.upsertRecords(upsertRecords);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error uploading topics:', error);
    return NextResponse.json(
      { error: 'Failed to upload topics' },
      { status: 500 }
    );
  }
}
