export type Product = {
  name: string;
  price: number;
  description: string;
  image_url: string;
  id: string;
  category: string;
  category_id: string;
  created_at: Date;
};
enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}
export type User = {
  name: string;
  email: string;
  phone_number: number;
  id: string;
  role: Role;
  category_id: string;
  created_at: Date;
};

export type category = {
  name: string;
  id: string;
  products: Product[];
  created_at: Date;
};

export type Cart = {
  id: string;
  user: User;
  user_id: string;
  created_at: Date;
  product_id: string;
  product: Product;
};
export type Order = {
  id: string;
  user: User;
  user_id: string;
  created_at: Date;
  total_price: number;
  status: string;
  adress: string;
  payment_id: string;
  products: Product[];
};
