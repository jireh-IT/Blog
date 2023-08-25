export interface IPost {
  id: number;
  title?: string | null;
  author?: string | null;
  body?: string | null;
}

export type NewPost = Omit<IPost, 'id'> & { id: null };
