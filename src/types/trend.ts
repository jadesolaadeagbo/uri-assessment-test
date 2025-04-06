export interface SentimentPoint{
    date: string,
    sentiment: number
}

export interface HashtagTrendData{
        hashtag: string,
        range: string,
        trend: SentimentPoint[]
}
