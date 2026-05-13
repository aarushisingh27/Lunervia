import { GoogleGenAI } from '@google/genai';
import { InsightResult, Interest, PeriodMode } from '../types';

const GEMINI_MODEL = 'gemini-3-flash-preview';

type RawInsightResult = Partial<InsightResult>;

const getApiKey = () => {
  return "AIzaSyBorH3xba8FQSutjYOMw14qnLWHeNsUG4U";
};

const isClearlyInvalidApiKey = (apiKey: string) => {
  const normalized = apiKey.trim().toLowerCase();

  return (
    !normalized ||
    normalized.includes('placeholder') ||
    normalized.startsWith('sk-')
  );
};

const getClient = () => {
  const apiKey = getApiKey();

  if (isClearlyInvalidApiKey(apiKey)) {
    throw new Error(
      'Missing or invalid Gemini API key. Set VITE_GEMINI_API_KEY in .env.local to a real Google AI Studio Gemini key, then restart the Vite dev server.'
    );
  }

  return new GoogleGenAI({ apiKey });
};

const buildPrompt = (
  reflection: string,
  periodMode: PeriodMode | null,
  interests: Interest[]
) => {
  const selectedInterests = interests.length > 0 ? interests.join(', ') : 'None provided';
  const cycleContext = periodMode ?? 'Not enabled';

  return `
You are Lunervia, an emotionally intelligent cognitive reflection assistant.

Your task is to identify recurring thinking patterns from the user's reflection using supportive and psychologically informed reasoning.

Pattern Guidelines:
- Rumination: repetitive dwelling on distress, regret, or emotional pain.
- Catastrophizing: assuming worst-case outcomes or exaggerating negative consequences.
- Overthinking: excessive mental analysis causing stress or indecision.
- Positive Reframing: interpreting difficult experiences constructively.
- Emotional Avoidance: suppressing or distancing from emotions.
- Self-Criticism: harsh self-judgment, guilt, or feelings of inadequacy.
- Balanced Reflection: emotionally aware and regulated processing.

Instructions:
- Choose the MOST dominant cognitive pattern.
- Explain WHY the pattern appears using evidence from the reflection.
- Do NOT diagnose mental health conditions.
- Use emotionally supportive and calm language.
- Be insightful, specific, and emotionally intelligent.
- Avoid generic advice.
- Keep responses concise but meaningful.
- Return ONLY valid JSON.

Constraints:
- Do not diagnose or provide medical claims.
- Use warm, non-judgmental language.
- Base the answer on the reflection first, with cycle context and interests as supporting signals.
- "echoScore" must be an integer from 0 to 100.
- "activitySuggestion" should reference one or more of the user's selected interests when possible.
- Keep each string concise and useful for a wellness journaling app.

Example:

Reflection:
"I keep thinking everything will go wrong tomorrow and I won't be able to handle it."

Detected Pattern:
"Catastrophizing"

Reason:
"The reflection predicts worst-case outcomes and assumes inability to cope before events occur."

Output JSON shape:
{
  "pattern": string,
  "reflectionInsight": string,
  "suggestion": string,
  "moodIndicator": string,
  "echoScore": number,
  "activitySuggestion": string
}

User context:
- Period mode: ${cycleContext}
- Comfort activities: ${selectedInterests}

Journal reflection:
"""${reflection.trim()}"""
`.trim();
};

const extractJson = (text: string) => {
  const trimmed = text.trim();

  if (!trimmed) {
    throw new Error('Gemini returned an empty response.');
  }

  const fencedMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const jsonPayload = fencedMatch ? fencedMatch[1].trim() : trimmed;
  return JSON.parse(jsonPayload) as RawInsightResult;
};

const toCleanString = (value: unknown, fallback: string) => {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
};

const toEchoScore = (value: unknown) => {
  const numericValue =
    typeof value === 'number'
      ? value
      : typeof value === 'string'
        ? Number.parseInt(value, 10)
        : Number.NaN;

  if (!Number.isFinite(numericValue)) {
    return 65;
  }

  return Math.max(0, Math.min(100, Math.round(numericValue)));
};

const normalizeInsight = (payload: RawInsightResult): InsightResult => {
  return {
    pattern: toCleanString(payload.pattern, 'Reflective Processing'),
    reflectionInsight: toCleanString(
      payload.reflectionInsight,
      'Your reflection shows a meaningful emotional pattern worth noticing with care.'
    ),
    suggestion: toCleanString(
      payload.suggestion,
      'Pause, breathe, and try responding to yourself with a little more softness.'
    ),
    moodIndicator: toCleanString(payload.moodIndicator, 'Thoughtful'),
    echoScore: toEchoScore(payload.echoScore),
    activitySuggestion: toCleanString(
      payload.activitySuggestion,
      'Take a few quiet minutes to journal or do a small grounding activity that feels familiar.'
    ),
  };
};

export const analyzeThinkingPattern = async (
  reflection: string,
  periodMode: PeriodMode | null = null,
  interests: Interest[] = []
): Promise<InsightResult> => {
  const prompt = buildPrompt(reflection, periodMode, interests);
  const ai = getClient();

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    });

    return normalizeInsight(extractJson(response.text || ''));
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Gemini returned an invalid JSON response. Please try again.');
    }

    if (error instanceof Error) {
      throw new Error(`Gemini analysis failed: ${error.message}`);
    }

    throw new Error('Gemini analysis failed for an unknown reason.');
  }
};
