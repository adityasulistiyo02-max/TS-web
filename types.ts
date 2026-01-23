export interface Post {
  id: number;
  created_at: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  cover_image_url: string | null;
  category: 'Music' | 'Visual' | 'Event' | string;
  author?: string;
  is_published: boolean;
}

export type Category = 'All' | 'Music' | 'Visual' | 'Event';

export interface NavItem {
  label: string;
  path: string;
}