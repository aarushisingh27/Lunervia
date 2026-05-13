# Lunervia

Lunervia is an AI-powered cognitive reflection platform designed to help users identify recurring thought patterns, emotional trends, and behavioral loops through structured journaling and intelligent analysis.

The system uses Google Gemini AI to generate personalized cognitive insights and reflective suggestions aimed at improving emotional awareness and mental clarity.

---

## Features

### Cognitive Insight Panel
Analyzes journal inputs to identify thinking patterns such as:
- Rumination
- Catastrophizing
- Overthinking
- Positive reframing
- Emotional imbalance

### EchoScore
A visual emotional trend indicator that represents cognitive flexibility and emotional balance over time.

### Personalized Rituals
Generates custom reflective activities and behavioral suggestions based on user interests and emotional state.

### Cognitive Trend Dashboard
Tracks emotional progression, recurring patterns, and behavioral frequency using interactive visualizations.

### Privacy-Focused Access
Supports anonymous session-based interaction without requiring permanent user accounts.

---

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Google Gemini API (`gemini-3-flash-preview`)
- Vite
- SVG-based Data Visualizations

---

## Project Structure

```bash
components/
services/
App.tsx
index.tsx
vite.config.ts
```

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/aarushisingh27/Lunervia.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment File

Create a `.env.local` file in the project root:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

### 4. Start Development Server

```bash
npm run dev
```

---

## Notes

- This project currently performs Gemini API calls directly from the frontend for development simplicity.
- For production deployment, API calls should be routed through a secure backend server to protect API credentials.

---

## Future Improvements

- User authentication system
- Persistent journaling history
- Advanced emotional analytics
- AI-generated weekly reports
- Secure backend integration

---

## Author

Aarushi Singh