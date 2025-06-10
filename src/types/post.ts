export interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
}

export type PostParams = Partial<Omit<Post, 'id'>>;
