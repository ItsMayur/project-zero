import React from "react";
import Searchbar from "@/app/components/Marketplace/Searchbar";
import ProductMini from "../components/Marketplace/ProductMini";

const page = () => {
  return (
    <div className="bg-themeColor2">
      <Searchbar />
      <div className="space-y-4 ">
        <ProductMini />
        <ProductMini />
        <ProductMini />
        <ProductMini />
      </div>
    </div>
  );
};

export default page;
