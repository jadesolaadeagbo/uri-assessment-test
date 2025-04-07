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
### Displays:
- Title
- Range
- 📈 or 📉 based on sentiment direction
- Chart (via SentimentChart)

### 📊 SentimentChart
  Renders a line chart with:
- Date on x-axis
- Sentiment on y-axis

Memoized with React.memo.

# Dynamic Page — /insights/[hashtag]
- Grabs hashtag from router params
- Uses useHashtagTrend to fetch data

Shows:
- Spinner/skeleton on load
- Error with retry button if failed
- Chart and sentiment info if successful
- Uses responsive layout with Material UI

### 🧠 Performance Optimizations

React.memo -Memoize chart + card components
useCallback -	Memoize data fetch + retry handler
useMemo -	Format dates / calculate direction


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


