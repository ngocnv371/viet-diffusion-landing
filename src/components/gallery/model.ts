export interface Image extends ImageInfo {
  userId: string;
  seed: number;
  subseed: number;
  styleId: string;
  info: string;
  recent_likes_count: number;
  requestId: number;
}

export interface ImageInfo {
  id: number | string;
  cdnId: string;
  base64?: string;
  width: number;
  height: number;
  prompt: string;
  negative_prompt: string;
  liked: boolean;
  likes_count: number;
  createdAt: string;
  updatedAt: string;
}
export interface Paged<T> {
  mode: string;
  order: string;
  query: string;
  limit: number;
  offset: number;
  loading: boolean;
  hasMore: boolean;
  items: T[];
}

export interface ListFilter {
  order: string;
  query: string;
  limit: number;
  offset: number;
  mode: string;
}
