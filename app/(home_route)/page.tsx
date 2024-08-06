import ProductCard from "../components/ProductCard";
import GridView from "../components/ui/GridView";
import startDb from "../lib/db";
import ProductModel from "../models/productModel";
interface LatestProducts {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  price: {
    base: number;
    discounted: number;
  };
  sale?: number;
}
const fetchLatestProducts = async () => {
  await startDb();
  const products = await ProductModel.find().sort("-createdAt").limit(20);

  const productList = products.map((product) => {
    return {
      id: product._id.toString(),
      title: product.title,
      description: product.description,
      category: product.category,
      thumbnail: product.thumbnail.url,
      price: product.price,
      sale: product.sale,
    };
  });
  return JSON.stringify(productList);
};
export default async function Home() {
  const latestProducts = await fetchLatestProducts();
  const parsedProducts = JSON.parse(latestProducts) as LatestProducts[];
  return (
    <GridView>
      {parsedProducts.map((product, index) => {
        return <ProductCard key={index} product={product} />;
      })}
    </GridView>
  );
}
