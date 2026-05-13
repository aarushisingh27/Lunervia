
export enum PeriodMode {
  ON_PERIOD = 'On Period',
  POST_MENSTRUAL = 'Post-Menstrual',
  MID_CYCLE = 'Mid-Cycle',
  PRE_MENSTRUAL = 'Pre-Menstrual'
}

export type Interest = 
  | 'Music' 
  | 'Reading' 
  | 'Journaling' 
  | 'Physical Activity' 
  | 'Meditation' 
  | 'Art' 
  | 'Gaming' 
  | 'Talking to Friends';

export interface User {
  email: string;
  username: string;
}

export interface InsightResult {
  pattern: string;
  reflectionInsight: string;
  suggestion: string;
  moodIndicator: string;
  echoScore: number;
  activitySuggestion: string;
}

export interface JournalEntry {
  timestamp: number;
  insight: InsightResult;
}

export interface AnalysisState {
  isAnalyzing: boolean;
  insight: InsightResult | null;
  error: string | null;
}
