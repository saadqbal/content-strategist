import { Schema, model, Document, models } from 'mongoose';

export interface ITopic extends Document {
  suggestion: string;
  volumeReached: number;
  competition: number;
  costPerClick: number;
  source: string;
  slug: string;
  pineconeId: string; // Reference to Pinecone vector ID
  createdAt: Date;
  updatedAt: Date;
}

const TopicSchema = new Schema<ITopic>({
  suggestion: { type: String, required: true, index: true },
  volumeReached: { type: Number, required: true },
  competition: { type: Number, required: true },
  costPerClick: { type: Number, required: true },
  source: { type: String, default: 'public' }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Text index for search
TopicSchema.index({ suggestion: 'text' });

// Prevent model recompilation error
export const Topic = models.Topic || model<ITopic>('Topic', TopicSchema);
