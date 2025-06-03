import { Schema, model, Document, models } from 'mongoose';

export interface ICompetitor extends Document {
  slug: string;
  url: string;
  volumeReached: number;
  source: string;
}

const CompetitorSchema = new Schema<ICompetitor>({
  slug: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  volumeReached: { type: Number, default: 0 },
  source: { type: String, default: '' }
});

export const Competitor = models.Competitor || model<ICompetitor>('Competitor', CompetitorSchema);
