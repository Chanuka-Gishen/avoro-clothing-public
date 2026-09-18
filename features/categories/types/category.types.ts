export interface Category {
  id: string;
  name: string;
  slug: string;

  description?: string | null;

  image?: string | null;

  parentId?: string | null;

  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}
