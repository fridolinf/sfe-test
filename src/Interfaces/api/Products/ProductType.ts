export type ProductType = {
  id: number;
  title: string;
  description?: string;
  price: number;
  quantity?: number;
  discountPercentage?: number;
  discountedPrice?: number;
  rating: number;
  stock?: number;
  total?: number;
  brand?: string;
  category?: string;
  thumbnail?: string;
  images?: string[] | [];

  discountedTotal?: number;
  userId?: number;
  totalProducts?: number;
  totalQuantity?: number;
};