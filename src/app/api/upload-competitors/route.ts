import { NextResponse } from 'next/server';
import { connectMongo } from '@/lib/mongo';
import { parse } from 'csv-parse/sync';
import { Competitor } from '@/models/Competitor';


export async function POST(req: Request) {
  try {
    await connectMongo();
    const { competitors } = await req.json();

    const records = parse(competitors, { columns: true });
    
    for (const record of records) {
      const slug = record.description.split('/').pop();

      if (!slug) {
        console.log('No slug found for', record.description);
        continue;
      }

      const newCompetitor = new Competitor({
        slug,
        url: record.description,
        volumeReached: parseInt(record.volumeReached),
        source: record.source
      });
      await newCompetitor.save();
    }


    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error uploading competitors:', error);
    return NextResponse.json(
      { error: 'Failed to upload topics' },
      { status: 500 }
    );
  }
}
