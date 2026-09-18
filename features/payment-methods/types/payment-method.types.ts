export interface PaymentMethod {
  id: string;
  title: string;
  code: string;
  description?: string | null;

  image?: string | null;

  isActive: boolean;
  order: number;

  createdAt: string;
  updatedAt: string;
}
