"use client";
import { useRouter } from "next/navigation";

const ProductMini = () => {
  const product_id = 3;
  const router = useRouter();
  const goto_product = () => {
    router.push(`/marketplace/product_page?product_id=${product_id}`);
  };
  return (
    <div
      onClick={goto_product}
      className="bg-themeColor1 p-4 flex flex-col items-center mx-6 rounded"
    >
      <div>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/project-zero-6ffef.appspot.com/o/Dairy.jpg?alt=media&token=cdcf0ee8-af8c-49b7-8066-39c02287e932"
          alt=""
          className="h-60"
        />
      </div>
      <div className="w-full px-4 space-y-1">
        <h3 className="text-2xl text-text1">Dairy</h3>
        <p className="italic text-text1">200 Rs</p>
        <p className="text-sm text-themeColor3">⭐ 3.4</p>
      </div>
    </div>
  );
};

export default ProductMini;
