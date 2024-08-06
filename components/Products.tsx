import Image from "next/image";
import { Product } from "@/types"; // Import your Product type

interface ProductsProps {
  products: Product[]; // Define the type of the products prop
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  console.log("products", products);

  return (
    <section>
      {products.map((product) => {
        return (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <h3>{product.price}</h3>
            <p>{product.description}</p>
            <h4>{product.catagory.name}</h4>
            <Image
              src={product.image_url}
              alt={product.name}
              width={150}
              height={150}
            />
          </div>
        );
      })}
    </section>
  );
};

export default Products;
