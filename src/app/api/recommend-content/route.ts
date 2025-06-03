import { openai } from '@/lib/openai-client';
import { pineconeIndex } from '@/lib/pinecone-client';
import { Competitor } from '@/models/Competitor';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { connectMongo } from '@/lib/mongo';

export async function GET(req: Request) {
  try {
    // Ensure MongoDB connection is established
    await connectMongo();

    const { searchParams } = new URL(req.url);
    const keyThemes = searchParams.get('themeSlug')?.split(',') || [];
    const competitorSlugs = await Competitor.distinct('slug');
    const ideasToGenerate = searchParams.get('ideasToGenerate') || '10';
    const trendingTopics = [];

    // Get relevant content from Pinecone
    for (const themeSlug of keyThemes) {
      const results = await pineconeIndex.searchRecords({
        query: {
          topK: 5,
          inputs: { text: themeSlug.trim() },
        },
        rerank: {
          model: 'bge-reranker-v2-m3',
          topN: 5,
          rankFields: ['chunk_text'],
        },
      });
      trendingTopics.push(...results.result.hits.map(hit => hit.fields['chunk_text']));
    }

    const systemMessage: ChatCompletionMessageParam = {
      role: 'system',
      content: `You are a content strategist for a fast-growing business.
Your task is to generate ${ideasToGenerate} unique blog post ideas that:
1. Are unique but inspired by what's trending and what competitors are doing well
2. Match one or more of the key themes
3. Would resonate with the ideal customer based on the trending topics and competitor content

Format each idea as a JSON object with:
- slug: kebab-case version of the title (e.g., /guides/eco-friendly-marketing)
- title: catchy, SEO-optimized title
- reason: a one-sentence rationale explaining why this blog post would be valuable

Return the output as an array of ${ideasToGenerate} JSON objects.`
    };

    const userMessage: ChatCompletionMessageParam = {
      role: 'user',
      content: `Based on the following inputs, generate ${ideasToGenerate} recommended blog post ideas:

Trending Topics: ${trendingTopics.join(', ')}

Key Theme Slugs: ${keyThemes.join(', ')}

Top Competitor Slugs: ${competitorSlugs.join(', ')}`
    };




    const chat = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [systemMessage, userMessage],
      temperature: 0.7,
      max_tokens: 2000
    });

    const rawContent = chat.choices[0].message.content?.replace(/```json|```/g, '').trim();
    const ideas = JSON.parse(rawContent || '[]');
    return new Response(JSON.stringify({ ideas }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return new Response(JSON.stringify({ error: 'Failed to connect to MongoDB' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
