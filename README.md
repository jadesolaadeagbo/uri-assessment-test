# 📊 Hashtag Sentiment Insights

A dynamic sentiment insight page that visualizes Twitter-style hashtag trends using an interactive chart.

## 🧩 Overview

This feature enables a route at `/insights/[hashtag]` that fetches and visualizes sentiment data for a specific hashtag. It uses a mocked API, Material UI for styling, and `@mui/x-charts` for charts.

---

## ✅ Features

- 🔗 Dynamic routing via `/insights/[hashtag]`
- 📡 Fetches data from a mock API at `/api/trends/[hashtag]`
- 📈 Renders a sentiment trend line chart using `@mui/x-charts`
- 🧾 Displays:
  - Hashtag title (e.g. `#uri`)
  - Date range (e.g. `Apr 1 - Apr 7, 2025`)
  - Trend direction indicator (📈 / 📉)
- 💅 Styled with Material UI
- 📱 Mobile responsive
- 💪 Performance optimized using `React.memo`, `useCallback`, and `useMemo`
- ⏳ Loading and error states supported

---

## 🗂 File Structure

src/ 
├── pages/ 
  │ ├── insights/ │ │ └── [hashtag].tsx # Dynamic route 
│ └── api/ │ └── trends/ │ └── [hashtag].ts # Mock API route 
├── components/ │ ├── HashtagTrendCard.tsx # Main card showing sentiment info + chart 
  │ └── SentimentChart.tsx # Chart component 
├── hooks/ │ └── useHashtagTrend.ts # Custom data fetching hook 
├── mocks/ │ └── trendData.ts

## Custom Hook — useHashtagTrend
Handles API call and manages state.

✅ isLoading, error, refetch supported

🧠 Uses useCallback for fetch memoization


## 📦 HashtagTrendCard
# Displays:
- Title
- Range
- 📈 or 📉 based on sentiment direction
- Chart (via SentimentChart)

# 📊 SentimentChart
  Renders a line chart with:
- Date on x-axis
- Sentiment on y-axis

Memoized with React.memo.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

