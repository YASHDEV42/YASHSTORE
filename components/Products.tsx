import Image from "next/image";
import { Product } from "@/types"; // Import your Product type
import Link from "next/link";

interface ProductsProps {
  products: Product[]; // Define the type of the products prop
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  console.log("products", products);

  return (
    <section className="center-row flex-wrap gap-5">
      {products.map((product) => {
        return (
          <Link href={`/products/${product.id}`} key={product.id}>
            <h2>{product.name}</h2>
            <h3>{product.price}</h3>
            <Image
              src={product.image_url}
              alt={product.name}
              width={150}
              height={150}
            />
          </Link>
        );
      })}
    </section>
  );
};

export default Products;
