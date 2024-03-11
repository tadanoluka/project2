export interface IPost {
  id: bigint;
  createdAt: string;
  publishedAt: string;
  title: string;
  content: string;
  isPublished: boolean;
}
