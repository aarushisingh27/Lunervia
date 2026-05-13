
# Lunervia

Lunervia is an AI-powered cognitive reflection system designed to help users identify and understand recurring thought patterns through structured journal inputs.

## Setup

1. Create a `.env.local` file in the project root.
2. Add your Gemini API key:

```bash
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

3. Start the app:

```bash
npm run dev
```

## Features

- **Cognitive Insight Panel**: Detailed analysis of thinking patterns like rumination, catastrophizing, and positive reframing.
- **EchoScore**: A visual representation of emotional flexibility and balance trends.
- **Personalized Rituals**: Suggestions based on user interests to help break negative thought loops.
- **Cognitive Trend Dashboard**: Track your emotional progress and pattern frequency over time.
- **Privacy First**: Anonymous session-based access.

## Tech Stack

- React (v18)
- Google Gemini API with `gemini-3-flash-preview` (`@google/genai`)
- Tailwind CSS
- SVG Data Visualizations

## Notes

- The current integration calls Gemini directly from the browser for simplicity in this frontend-only project.
- For production, move the API call behind a server so the API key is not exposed to clients.
