export interface Category {
  id: string;
  name: string;
  slug: string;

  description?: string | null;

  image?: string | null;

  parentId?: string | null;

  metaTitle: string | null;
  metaDescription: string | null;
  metaTags: string[];

  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}
