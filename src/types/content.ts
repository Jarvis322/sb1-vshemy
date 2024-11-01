export interface StreamingContent {
  platform: string;
  contents: Content[];
}

export interface Content {
  title: string;
  type: 'movie' | 'series';
  genre: string;
  mood: string[];
}

export interface LuckyPickResult {
  content: Content;
  platform: string;
}